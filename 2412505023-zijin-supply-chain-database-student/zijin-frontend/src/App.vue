<script setup>
import { computed, onMounted, ref } from 'vue'

const tableOptions = [
  {
    value: 'orders',
    label: '订单表 orders',
    desc: '记录客户订单、产品类别、销售金额和订单状态。',
    file: 'orders.csv',
  },
  {
    value: 'inventory',
    label: '库存表 inventory',
    desc: '记录仓库位置、库存吨数、最低库存和最大容量。',
    file: 'inventory.csv',
  },
  {
    value: 'transportation',
    label: '运输表 transportation',
    desc: '记录订单运输路线、运输方式、运输天数和运输成本。',
    file: 'transportation.csv',
  },
]

const selectedTable = ref('orders')
const file = ref(null)
const fileInput = ref(null)
const count = ref(0)
const primaryKey = ref('')
const columns = ref([])
const rows = ref([])
const message = ref('')
const loading = ref(false)
const previewLimit = ref(20)
const formMode = ref('create')
const editingId = ref('')
const form = ref({})

const selectedTableInfo = computed(
  () => tableOptions.find((item) => item.value === selectedTable.value) || tableOptions[0],
)

const editableColumns = computed(() =>
  columns.value.filter((column) => column !== primaryKey.value),
)

const tableRows = computed(() => rows.value.map((row) => rowToRecord(row)))

const formTitle = computed(() => (formMode.value === 'edit' ? '编辑记录' : '新增记录'))

async function requestJson(url, options) {
  const response = await fetch(url, options)
  const text = await response.text()
  let data = {}
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      throw new Error(text)
    }
  }
  if (!response.ok) {
    throw new Error(data.error || `请求失败：${response.status}`)
  }
  return data
}

async function refresh() {
  loading.value = true
  message.value = ''
  try {
    const countResp = await requestJson(`/api/${selectedTable.value}/count`)
    const listResp = await requestJson(`/api/${selectedTable.value}/list?limit=${previewLimit.value}`)
    count.value = countResp.count
    primaryKey.value = listResp.primaryKey || ''
    columns.value = listResp.columns || []
    rows.value = listResp.rows || []
    ensureForm()
  } catch (error) {
    message.value = error.message
  } finally {
    loading.value = false
  }
}

async function upload() {
  if (!file.value) {
    message.value = `请先选择 ${selectedTableInfo.value.file}`
    return
  }
  if (!isExpectedCsvFile(file.value)) {
    message.value = buildFileMismatchMessage(file.value)
    return
  }
  loading.value = true
  try {
    const csvText = await file.value.text()
    const data = await requestJson(`/api/import/${selectedTable.value}`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/csv; charset=utf-8' },
      body: csvText,
    })
    message.value = `已导入 ${data.inserted} 行到 ${data.table}`
    await refresh()
  } catch (error) {
    message.value = error.message
  } finally {
    loading.value = false
  }
}

async function saveRow() {
  if (!columns.value.length) {
    message.value = '请先确认后端接口正常返回表字段'
    return
  }

  loading.value = true
  try {
    if (formMode.value === 'edit') {
      const body = Object.fromEntries(editableColumns.value.map((column) => [column, form.value[column] || '']))
      await requestJson(`/api/${selectedTable.value}/row/${encodeURIComponent(editingId.value)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      })
      message.value = `已修改 ${selectedTable.value} 中的记录：${editingId.value}`
    } else {
      const body = Object.fromEntries(columns.value.map((column) => [column, form.value[column] || '']))
      await requestJson(`/api/${selectedTable.value}/row`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      })
      message.value = `已新增一条记录到 ${selectedTable.value}`
    }
    resetForm()
    await refresh()
  } catch (error) {
    message.value = error.message
  } finally {
    loading.value = false
  }
}

function startEdit(row) {
  formMode.value = 'edit'
  form.value = { ...row }
  editingId.value = String(row[primaryKey.value] || '')
  message.value = `正在编辑主键为 ${editingId.value} 的记录`
}

async function deleteRow(row) {
  const id = String(row[primaryKey.value] || '')
  if (!id) {
    message.value = '无法删除：当前行没有主键值'
    return
  }
  if (!window.confirm(`确认删除 ${selectedTable.value} 中主键为 ${id} 的记录吗？`)) {
    return
  }

  loading.value = true
  try {
    await requestJson(`/api/${selectedTable.value}/row/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
    message.value = `已删除 ${selectedTable.value} 中的记录：${id}`
    resetForm()
    await refresh()
  } catch (error) {
    message.value = error.message
  } finally {
    loading.value = false
  }
}

function onFileChange(event) {
  const selectedFile = event.target.files?.[0] || null
  if (!selectedFile) {
    file.value = null
    message.value = ''
    return
  }

  if (!isExpectedCsvFile(selectedFile)) {
    file.value = null
    event.target.value = ''
    message.value = buildFileMismatchMessage(selectedFile)
    return
  }

  file.value = selectedFile
  message.value = `已选择 ${selectedFile.name}，可以导入到 ${selectedTable.value}`
}

function selectTable(tableValue) {
  if (selectedTable.value === tableValue) {
    return
  }
  selectedTable.value = tableValue
  clearSelectedFile()
  resetForm()
  refresh()
}

function clearSelectedFile() {
  file.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function isExpectedCsvFile(selectedFile) {
  return selectedFile.name.trim().toLowerCase() === selectedTableInfo.value.file.toLowerCase()
}

function buildFileMismatchMessage(selectedFile) {
  const selectedFileName = selectedFile.name
  const matchedTable = tableOptions.find(
    (table) => table.file.toLowerCase() === selectedFileName.trim().toLowerCase(),
  )
  const switchHint = matchedTable
    ? `如果要导入 ${selectedFileName}，请先切换到“${matchedTable.label}”页面。`
    : '请重新选择当前页面对应的 CSV 文件。'
  return `当前页面是“${selectedTableInfo.value.label}”，只能上传 ${selectedTableInfo.value.file}。你选择的是 ${selectedFileName}，不会上传。${switchHint}`
}

function rowToRecord(row) {
  return Object.fromEntries(columns.value.map((column, index) => [column, row[index] ?? '']))
}

function ensureForm() {
  form.value = Object.fromEntries(columns.value.map((column) => [column, form.value[column] || '']))
}

function resetForm() {
  formMode.value = 'create'
  editingId.value = ''
  form.value = Object.fromEntries(columns.value.map((column) => [column, '']))
}

onMounted(refresh)
</script>

<template>
  <main class="app-shell">
    <section class="hero" aria-label="项目介绍">
      <div class="hero-content">
        <p class="eyebrow">Zijin Mining Supply Chain</p>
        <h1>紫金矿业供应链数据管理与分析平台</h1>
        <p class="subtitle">
          前端页面已经提供好。写完 Spring Boot 后端、连接 MySQL 后，这里可以导入 CSV，并完成新增、查询、修改、删除操作。
        </p>
        <div class="flow-tags" aria-label="连接链路">
          <span>Vue 前端 5173</span>
          <span>Spring Boot 后端 8080</span>
          <span>MySQL：zijin_supply_chain</span>
        </div>
      </div>
      <button type="button" class="ghost" :disabled="loading" @click="refresh">
        {{ loading ? '刷新中...' : '刷新数据' }}
      </button>
    </section>

    <section class="table-switch-panel" aria-label="数据表页面切换">
      <div class="section-heading">
        <p class="eyebrow">Table Pages</p>
        <h2>选择一个数据表页面</h2>
        <p>每个页面都固定绑定自己的数据表和 CSV 文件，避免把库存文件导入到订单表这种错误。</p>
      </div>
      <div class="table-tabs" role="tablist" aria-label="数据表页面">
        <button
          v-for="table in tableOptions"
          :key="table.value"
          type="button"
          class="table-tab"
          :class="{ active: selectedTable === table.value }"
          :disabled="loading"
          role="tab"
          :aria-selected="selectedTable === table.value"
          @click="selectTable(table.value)"
        >
          <span class="tab-title">{{ table.label }}</span>
          <span class="tab-desc">{{ table.desc }}</span>
          <span class="tab-file">只上传 data/{{ table.file }}</span>
        </button>
      </div>
    </section>

    <section class="workspace-grid">
      <section class="panel import-panel" aria-label="数据导入">
        <div class="section-heading">
          <p class="eyebrow">CSV Import</p>
          <h2>导入 {{ selectedTableInfo.file }}</h2>
          <p>{{ selectedTableInfo.desc }}</p>
        </div>

        <div class="locked-table">
          <span>当前页面固定导入到</span>
          <strong>{{ selectedTableInfo.label }}</strong>
          <small>接口：/api/import/{{ selectedTable }}</small>
        </div>

        <label class="field file-field">
          <span>选择 CSV 文件</span>
          <input ref="fileInput" type="file" accept=".csv,text/csv" :disabled="loading" @change="onFileChange" />
          <small>本页只允许选择 data/{{ selectedTableInfo.file }}，选错文件不会上传。</small>
        </label>

        <p class="expected-file">
          应选择文件：<strong>data/{{ selectedTableInfo.file }}</strong>
        </p>

        <button type="button" class="primary" :disabled="loading" @click="upload">
          {{ loading ? '处理中...' : `导入 ${selectedTableInfo.file} 到 ${selectedTable}` }}
        </button>
      </section>

      <section class="panel editor-panel" aria-label="增删改查">
        <div class="section-heading">
          <p class="eyebrow">CRUD Manager</p>
          <h2>{{ formTitle }}</h2>
          <p>填写字段后可以新增记录；点击表格中的“编辑”后，可以修改当前记录。</p>
        </div>

        <div v-if="columns.length" class="form-grid">
          <label v-for="column in columns" :key="column" class="field">
            <span>
              {{ column }}
              <em v-if="column === primaryKey">主键</em>
            </span>
            <input
              v-model="form[column]"
              type="text"
              :disabled="loading || (formMode === 'edit' && column === primaryKey)"
              :placeholder="column === primaryKey ? '主键值不能重复' : '请输入字段值'"
            />
          </label>
        </div>
        <p v-else class="empty small-empty">暂无字段信息，请先确认后端已经启动。</p>

        <div class="button-row">
          <button type="button" class="primary" :disabled="loading || !columns.length" @click="saveRow">
            {{ loading ? '处理中...' : formMode === 'edit' ? '保存修改' : '新增记录' }}
          </button>
          <button type="button" class="secondary" :disabled="loading" @click="resetForm">
            {{ formMode === 'edit' ? '取消编辑' : '清空表单' }}
          </button>
        </div>
      </section>

      <section class="status-row" aria-label="状态信息">
        <article>
          <span>当前数据表</span>
          <strong>{{ selectedTable }}</strong>
        </article>
        <article>
          <span>MySQL 记录数</span>
          <strong>{{ count }}</strong>
        </article>
        <article>
          <span>主键字段</span>
          <strong>{{ primaryKey || '-' }}</strong>
        </article>
        <article>
          <span>接口状态</span>
          <strong>{{ loading ? '处理中' : '就绪' }}</strong>
        </article>
      </section>
    </section>

    <p v-if="message" class="message">{{ message }}</p>

    <section class="table-card" aria-label="数据预览">
      <div class="table-header">
        <div>
          <p class="eyebrow">Query Result</p>
          <h2>数据库数据查询与管理</h2>
        </div>
        <div class="table-tools">
          <label>
            显示行数
            <select v-model="previewLimit" :disabled="loading" @change="refresh">
              <option :value="10">前 10 行</option>
              <option :value="20">前 20 行</option>
              <option :value="50">前 50 行</option>
              <option :value="100">前 100 行</option>
            </select>
          </label>
          <span>查询 / 编辑 / 删除</span>
        </div>
      </div>

      <div class="table-wrap">
        <table v-if="columns.length">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column">{{ column }}</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in tableRows" :key="row[primaryKey] || rowIndex">
              <td v-for="column in columns" :key="column">{{ row[column] }}</td>
              <td class="actions-cell">
                <button type="button" class="text-button" :disabled="loading" @click="startEdit(row)">
                  编辑
                </button>
                <button type="button" class="text-button danger" :disabled="loading" @click="deleteRow(row)">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty">暂无数据。可以先导入 CSV，也可以在上方表单中新增一条记录。</p>
      </div>
    </section>
  </main>
</template>
