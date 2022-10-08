<template>
  <div class="editor-box">
    <ace
      ref="editor"
      :value="value"
      @init="initEditor"
      :lang="lang"
      :height="height === 0 ? '100%' : height"
      :theme="theme"
      :options="options"
      :width="width === 0 ? '100%' : width"
      v-bind="config"
    >
    </ace>
  </div>
</template>
<script>
import ace from 'vue2-ace-editor'
export default {
  name: 'aceEditor',
  components: {
    ace
  },
  props: {
    value: {
      type: null,
      default: ''
    },
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'monokai'
    },
    lang: {
      type: String,
      default: 'sql'
    },
    config: {
      type: Object,
      default: () => {
        return {
          tab_size: 2,
          font_size: 14,
          atom: true
        }
      }
    }
  },
  computed: {
    options() {
      if (this.readOnly) {
        return {
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: this.config.atom,
          showPrintMargin: false,
          tabSize: this.config.tab_size,
          fontSize: this.config.font_size,
          readOnly: true
        }
      }
      return {
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: this.config.atom,
        showPrintMargin: false,
        tabSize: this.config.tab_size,
        fontSize: this.config.font_size,
        readOnly: false
      }
    }
  },
  created() {},
  methods: {
    initEditor(editor) {
      require('brace/ext/language_tools')
      // 设置语言
      require('brace/mode/sql')
      require('brace/snippets/sql')
      // 设置主题 按需加载
      require('brace/theme/monokai')
      require('brace/theme/chrome')
      require('brace/theme/crimson_editor')
      require('brace/theme/eclipse')
      require('brace/mode/html')
      require('brace/snippets/html')
      require('brace/mode/json')
      require('brace/snippets/json')
      require('brace/mode/less')
      require('brace/mode/java')
      require('brace/mode/yaml')
      require('brace/snippets/java')
      // 监听值的变化
      editor.getSession().on('change', () => {
        this.$emit('change', editor.getValue())
        this.$emit('input', editor.getValue())
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.editor-box {
  border: 1px solid #103b5c;
  border-radius: 3px;
  ::v-deep .ace_content {
    background: #031f3b;
    .ace_layer.ace_marker-layer .ace_active-line {
      background: #02042d;
    }
  }
  ::v-deep .ace_gutter {
    background: #00142c;
    color: #8f908a;
    .ace_gutter-active-line {
      background: #02042d;
    }
  }
}
</style>
