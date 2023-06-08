<script setup lang="ts">
import CourseTable from '@/views/pages/courselist/CourseTable.vue';

// Define the props for the component
const props = defineProps({
  item: {
    type: String,
    required: true,
  },
});

// List of departments
const departments = [
  "体育部",
  "教务处",
  "动画与数字艺术学院",
  "艺术研究院",
  "戏剧影视学院",
  "音乐与录音艺术学院",
  "经济与管理学院",
  "数据科学与智能媒体学院",
  "文化产业管理学院",
  "人文学院",
  "播音主持艺术学院",
  "马克思主义学院",
  "外国语言文化学院",
  "传播研究院",
  "新闻学院",
  "国际传媒教育学院",
  "信息与通信工程学院",
  "广告学院",
  "政府与公共事务学院",
  "电视学院",
  "媒体融合与传播国家重点实验室",
  "计算机与网络空间安全学院",
  "学生工作部（处）（武装部）",
  "海南国际学院"
];

</script>

<template>
  <div>
    <!-- Render CourseTable component for each department -->
    <div
      v-for="department in departments"
      :key="department"
    >
      <CourseTable :departmentName="department" />
    </div>
  </div>
</template>
