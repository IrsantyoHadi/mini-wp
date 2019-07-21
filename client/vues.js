const baseUrl = 'http://localhost:3000'
new Vue({
  el: "#app",
  data: {
    articles: [],
    filterArticles: [],
    search: '',
    title: '',
    content: '',
    section: {
      listArticle: true,
      addForm: false,
      navArticle: true,
      searchArticle: false,
      editForm: false
    }
  },
  methods: {
    addArticle() {
      axios({
        method: 'post',
        url: `${baseUrl}/articles`,
        data: {
          title: this.title,
          content: 'LOREM IPSUM IPSUM'
        }
      })
        .then(({ data }) => {
          this.articles.unshift(data.data)
          this.show(['listArticle', 'navArticle'])
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteArticle(params) {
      axios({
        method: 'delete',
        url: `${baseUrl}/articles/${params}`,
      })
        .then(({ data }) => {
          let found = this.articles.filter(el => {
            return el._id != params
          })
          this.articles = found
          this.show(['listArticle', 'navArticle'])
        })
        .catch(err => {
          console.log(err);
        })
    },

    callForm(params) {
      let found = this.articles.filter((el) => {
        if (el._id == params) {
          return el
        }
      })
      this.filterArticles = found
      this.title = found[0].title
      this.content = found[0].content
      this.show(['editForm'])
    },
    editArticle(params) {
      axios({
        method: 'put',
        url: `${baseUrl}/articles/${params}`,
        data: {
          title: this.title,
          content: this.content
        }
      })
        .then(({ data }) => {
          this.articles.forEach(el => {
            if (el._id == params) {
              el.title = this.title
              el.content = this.content
            }
          })
          this.title = ''
          this.content = ''
          this.show(['listArticle', 'navArticle'])
        })
        .catch(err => {
          console.log(err);
        })
    },
    show([...input]) {
      Object.keys(this.section).forEach(el => {
        this.section[el] = false
      })

      input.forEach(el => {
        this.section[el] = true
      })

    },
    searchArticles() {
      axios({
        method: 'get',
        url: `${baseUrl}/articles/?title=${this.search}`,
      })
        .then(({ data }) => {
          if (data.data.length) {
            this.filterArticles = data.data
            Swal.fire({
              text: `${this.filterArticles.length} Data Found`,
              type: 'success'
            })
            this.show(['searchArticle', 'navArticle'])
          } else {
            Swal.fire({
              text: 'Data Not Found',
              type: 'question'
            })
            this.show(['navArticle'])
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: `${baseUrl}/articles`,
    })
      .then(({ data }) => {
        this.articles = data.data
      })
      .catch(err => {
        console.log(err);
      })
  }
})