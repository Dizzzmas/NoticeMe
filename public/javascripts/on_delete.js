    function deletePost(userId, id) {
      let http = new XMLHttpRequest();
      let url = `http://localhost:3001/api/v1/users/${userId}/posts/${id}`;
      let params = '';
      http.open('DELETE', url, true);

      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState === 4 && http.status === 204) {
          window.location.replace('http://localhost:3001/posts?page=1');
        }
      };
      http.send(params);
    }
