function onSearch() {
    let http = new XMLHttpRequest();
    let search_str = document.getElementById("Search").value;
    let url = `http://localhost:3001/api/v1/posts/search?search=${search_str}`;


    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            let res = JSON.parse(http.responseText);
            let search_template = Handlebars.templates['search.hbs'];
            document.getElementById('SearchRes').innerHTML = search_template({search_str: search_str, search_res: res});;


        }
    };
    http.open('GET', url, true);

    http.send()

}