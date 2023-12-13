<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { SpeedInsights } from '@vercel/speed-insights/vue';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout />
  <SpeedInsights />
</template>
