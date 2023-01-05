<!-- html结构 -->
<template>
  <n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <n-notification-provider :max="3">
      <n-message-provider>
        <n-card>
          <HeadVue />
          <MainVue />
          <FootVue />
        </n-card>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<!-- vue(Ts)代码 -->
<script setup lang="ts">
import FootVue from './components/Foot.vue';
import HeadVue from './components/Head.vue';
import MainVue from './components/Main.vue';
</script>

<!-- 样式设置 -->
<style lang="scss">
body {
  min-width: 800px;
}
.n-card {
  position: absolute;
  left: 50%;

  transform: translateX(-50%);
  width: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>