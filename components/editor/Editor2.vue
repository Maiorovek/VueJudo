<template>
    <div>
        <DxHtmlEditor
          :value="content"
          height="725px"
          @update:value="newValue"
        >
            <DxMediaResizing :enabled="true"/>
            <DxImageUpload
              :tabs="currentTabs"
              file-upload-mode="base64"
            />
            <DxToolbar :multiline="isMultiline">
                <DxItem name="undo"/>
                <DxItem name="redo"/>
                <DxItem name="separator"/>
                <DxItem
                  :accepted-values="sizeValues"
                  name="size"
                />
                <DxItem
                  :accepted-values="fontValues"
                  name="font"
                />
                <DxItem name="separator"/>
                <DxItem name="bold"/>
                <DxItem name="italic"/>
                <DxItem name="strike"/>
                <DxItem name="underline"/>
                <DxItem name="separator"/>
                <DxItem name="alignLeft"/>
                <DxItem name="alignCenter"/>
                <DxItem name="alignRight"/>
                <DxItem name="alignJustify"/>
                <DxItem name="separator"/>
                <DxItem name="orderedList"/>
                <DxItem name="bulletList"/>
                <DxItem name="separator"/>
                <DxItem
                  :accepted-values="headerValues"
                  name="header"
                />
                <DxItem name="separator"/>
                <DxItem name="color"/>
                <DxItem name="background"/>
                <DxItem name="separator"/>
                <DxItem name="link"/>
                <DxItem name="image"/>
                <DxItem name="separator"/>
                <DxItem name="clear"/>
                <DxItem name="codeBlock"/>
                <DxItem name="blockquote"/>
                <DxItem name="separator"/>
                <DxItem name="insertTable"/>
                <DxItem name="deleteTable"/>
                <DxItem name="insertRowAbove"/>
                <DxItem name="insertRowBelow"/>
                <DxItem name="deleteRow"/>
                <DxItem name="insertColumnLeft"/>
                <DxItem name="insertColumnRight"/>
                <DxItem name="deleteColumn"/>
            </DxToolbar>
        </DxHtmlEditor>
    </div>
</template>
<script>
import {
   DxHtmlEditor,
   DxToolbar,
   DxMediaResizing,
   DxImageUpload,
   DxItem
} from 'devextreme-vue/html-editor';
import { DxCheckBox } from 'devextreme-vue/check-box';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { tabs, sizeValues, fontValues } from './data';

export default {
   components: {
      DxHtmlEditor,
      DxMediaResizing,
      DxToolbar,
      DxItem,
      DxImageUpload,
      DxCheckBox,
      DxSelectBox,
   },
   props: {
      content: ``,
   },
   data() {
      return {
         tabs,
         sizeValues,
         fontValues,
         headerValues: [false, 1, 2, 3, 4, 5],
         currentTabs: tabs[2].value,
         isMultiline: true,
      };
   },
   methods: {
      newValue(value) {
         this.$emit('valueEditor', value)
      }
   }
};
</script>
<style>
.dx-htmleditor {
    border-color: #0D0D0D;
}

.dx-htmleditor .dx-htmleditor-toolbar-wrapper:first-child {
    border-bottom: 1px solid #0D0D0D;
}

.dx-htmleditor-toolbar-separator {
    border-left: 1px solid #0D0D0D;
}

.dx-htmleditor-content img {
    vertical-align: middle;
    padding-right: 10px;
}

.dx-htmleditor-content table {
    width: 50%;
}

.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    margin-top: 20px;
}

.caption {
    font-size: 18px;
    font-weight: 500;
}

.option {
    margin-top: 10px;
    display: inline-block;
    margin-right: 40px;
}

.option > .dx-selectbox,
.option > .label {
    display: inline-block;
    vertical-align: middle;
}

.option > .label {
    margin-right: 10px;
}
</style>
