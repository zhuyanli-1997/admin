<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" label-width="80px">
          <el-form-item label="城市名称">
            <el-input v-model="city.name" @input="getFirstLetter"></el-input>
          </el-form-item>
          <el-form-item label="索引">
            <el-input v-model="city.index"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import pinyin from "pinyin";
export default {
  name: "Createcity",
  data() {
    return { city: { name: "", index: "A" } };
  },
  created() {
    this.id = this.$route.params.id;
    this.getData(this.id);
  },
  methods: {
    getData(id) {
      axios.get("/city/" + id).then(res => {
        console.log(res);
        this.city.name = res.data.data.name;
        this.city.index = res.data.data.index;
      });
    },
    // 重置
    cancel() {
      (this.city.name = ""), (this.city.index = "");
    },
    // 提交修改
    onSubmit() {
      // alert("1111");
      axios
        .put("/city/edit/" + this.id, {
          name: this.city.name,
          index: this.city.index
        })
        .then(res => {
          this.$message({
            message: res.data.msg,
            type: "success"
          });

          this.$router.push({
            path: "/city/list"
          });
        });
    },
    // 获取第一个大写字母
    getFirstLetter() {
      if (this.city.name) {
        var first = pinyin(this.city.name[0], {
          style: pinyin.STYLE_FIRST_LETTER
        });
        console.log(first);
        this.city.index = first[0][0].toUpperCase();
      }
    }
  },

  components: {}
};
</script>
