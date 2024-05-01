<template>
  <button  @click="openPrint()">点击打印</button>
  <div id="printContent">
    <table>
      <tr>
        <td>1</td>
        <td>2</td>
      </tr>
    </table>
  </div>
</template>

<script>
import print from 'print-js'
export default {
  methods:{
    openPrint(){
      print({
        printable: 'printContent',
        type: 'html',
        targetStyles: ['*']
      })
    }
  }
}
</script>

<style>

</style>