function getCommentList() {
  $.ajax({
    method: "get",
    url: "http://www.liulongbin.top:3006/api/cmtlist",
    success: function (res) {
      if (res.status !== 200) return alert('获取评论列表失败')
      var rows = []
      $.each(res.data, function (i, item) {
        var str = '<li class="list-group-item"><span class="badge" style="background-color: #f0ad4e;">评论时间:' + item.time + '</span><span class="badge" style="background-color: #5bc0de;">评论人:' + item.username + '</span>' + item.content + '</li>'
        rows.push(str)
      })
      $('#cmt_list').empty().append(rows.join(''))
    }
  })
}

getCommentList()

$(function () {
  $('#formAddCmt').submit(function (e) {
    e.preventDefault()
    var data = $(this).serialize()
    $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
      // console.log(res);
      if (res.status !== 201) return alert('发表评论失败')
      // 刷新评论列表
      getCommentList()
      // 清空form表单
      // 将jquery转换为原生javascript对象
      $('#formAddCmt')[0].reset()
    })
  })
})