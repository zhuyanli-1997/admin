<template>
  <div class="app-container">
    <el-row>
      <el-button @click="add" type="danger">添加</el-button>
    </el-row>
    <el-table ref="singleTable" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column property="imgUrl" label="电影海报" width="120">
      </el-table-column>
      <el-table-column property="title" label="电影名字" width="120">
      </el-table-column>
      <el-table-column property="stars" label="电影演员" width="120">
      </el-table-column>
      <el-table-column property="region" label="电影地区" width="120">
      </el-table-column>
      <el-table-column property="ratings" label="电影评分" width="120">
      </el-table-column>
      <el-table-column property="description" label="电影描述" width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- scope 当前列-->
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="changePage"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      total: 1,
      tableData: [],
      currentRow: null
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    // 获取全部城市数据
    getMovies() {
      axios.get("/movie").then(res => {
        console.log(res);
        if (res.data.code === 20000) {
          this.tableData = res.data.list;
        }
      });
    },
    // 分页
    /* getMovies() {
      axios
        .get(`/movie?page=${this.currentPage}&pageSize=${this.pageSize}`)
        .then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        });
    }, */

    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios.delete("/delmovie/" + id).then(res => {
            if (res.data.code === 20000) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
            }
            this.getMovies();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    handleEdit(id) {
      // alert(id);
      this.$router.push({
        path: "/movie/edit/" + id
      });
    },
    // 添加
    add() {
      this.$router.push({
        path: "/movie/create"
      });
    },
    changePage(page) {
      // alert(page);
      this.currentPage = page;
      this.getCitys();
    }
  }
};
</script>

<style scoped></style>
