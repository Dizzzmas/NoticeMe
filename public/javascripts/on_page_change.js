let http = new XMLHttpRequest();
let url = `http://localhost:3001/api/v1/posts?page=1`;
http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {

        let res = JSON.parse(http.responseText);
        let pageCount = Math.ceil(res.count / 2);
        let posts_template = Handlebars.templates['posts.hbs'];
        document.getElementById('Posts').innerHTML = posts_template({posts: res, page: 1, pageCount: pageCount});
        document.getElementById('NextPage').disabled = 1 === pageCount;
        document.getElementById('PrevPage').disabled = true;
    }
};
http.open('GET', url, true);

http.send();

function turnPage(direction) {
    let http = new XMLHttpRequest();
    let page = findGetParameter('page');
    if (direction === 'next') {
        page++;
    } else {
        page--;
    }
    let url = `http://localhost:3001/api/v1/posts?page=${page}`;


    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {

            let res = JSON.parse(http.responseText);
            let pageCount = Math.ceil(res.count / 2);
            let posts_template = Handlebars.templates['posts.hbs'];
            document.getElementById('Posts').innerHTML = posts_template({posts: res, page: page, pageCount: pageCount});
            window.history.pushState(page.toString(), 'Posts', `/posts?page=${page}`);
            document.getElementById('NextPage').disabled = page === pageCount;
            document.getElementById('PrevPage').disabled = page === 1;

        }
    };
    http.open('GET', url, true);

    http.send()

}

function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}