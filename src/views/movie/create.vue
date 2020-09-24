<template>
  <div class="app-container">
    <el-upload
      class="avatar-uploader"
      action="ups"
      :show-file-list="false"
      :http-request="UploadImage"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-row>
      <el-col :span="12">
        <el-form ref="form" label-width="80px">
          <el-form-item label="电影名称">
            <el-input v-model="movie.title"></el-input>
          </el-form-item>
          <el-form-item label="电影演员">
            <el-input v-model="movie.stars"></el-input>
          </el-form-item>
          <el-form-item label="电影评分">
            <el-input v-model="movie.ratings"></el-input>
          </el-form-item>
          <el-form-item label="电影描述">
            <el-input v-model="movie.description"></el-input>
          </el-form-item>
          <el-form-item label="选择城市">
            <el-select v-model="movie.region" placeholder="请选择活动区域">
              <el-option
                :label="item.name"
                :value="item._id"
                v-for="item in list"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
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
  name: "Createmovie",
  data() {
    return {
      movie: {
        title: "",
        stars: "",
        imgUrl: "",
        region: "",
        ratings: "",
        description: ""
      },
      list: [],
      imageUrl: ""
    };
  },
  created() {
    this.getCitys();
  },
  methods: {
    // 上传图片
    UploadImage(params) {
      console.log(params);
      let uploadData = new FormData();
      uploadData.append("avatar", params.file);
      axios.post("/upload", uploadData).then(res => {
        this.imageUrl = res.data.path;
      });
    },

    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取城市
    getCitys() {
      axios.get("/cityss").then(res => {
        console.log(res);
        this.list = res.data.list;
      });
    },

    cancel() {
      this.movie.title = "";
      this.movie.stars = "";
      this.movie.region = "";
      this.movie.ratings = "";
      this.movie.description = "";
    },
    // 添加
    onSubmit() {
      // alert("1111");
      axios
        .post("/movie/create", {
          title: this.movie.title,
          stars: this.movie.stars,
          region: this.movie.region,
          ratings: this.movie.ratings,
          description: this.movie.description
        })
        .then(res => {
          if (res.data.code === 20000) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          }
          this.$router.push({
            path: "/movie/list"
          });
        });
    }
    // 获取第一个大写字母
    /* getFirstLetter() {
      if (this.movie.name) {
        var first = pinyin(this.movie.name[0], {
          style: pinyin.STYLE_FIRST_LETTER
        });
        console.log(first);
        this.movie.index = first[0][0].toUpperCase();
      }
    } */
  },

  components: {}
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
