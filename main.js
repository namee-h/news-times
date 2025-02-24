// const API_KEY = `9daa88131d05423c8d8ac93e35a350c2`;
let sideBar = document.querySelector(".container section em");
let searchToggle = false;
let searchBox = document.querySelector(".search-box span");
let newsList = [];
let userInput = document.getElementById("input-box");
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (e) => getNewsByCategory(e))
);
let menus2 = document.querySelectorAll(".menu-box button");
menus2.forEach((menu) =>
  menu.addEventListener("click", (e) => getNewsByCategory(e))
);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

url = new URL(
  `https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?page=${page}&pageSize=${pageSize}`
);

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    getNewsKeyword();
  }
});

const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No matches for your search");
      }
    } else {
      throw new Error(data.message);
    }
    newsList = data.articles;
    totalResults = data.totalResults;
    console.log("ddd", data);
    render();
    paginationRender();
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines`
  );

  getNews();
};

const getNewsByCategory = async (e) => {
  let category = e.target.textContent.toLowerCase();
  url = new URL(
    `https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?category=${category}`
  );
  closeMenu();
  getNews();
};

const getNewsKeyword = async () => {
  let Keyword = userInput.value;
  url = new URL(
    `https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?&q=${Keyword}`
  );
  userInput.value = "";
  getNews();
};

const render = () => {
  let newsHTML = newsList
    .map(
      (news) => `
        <div class="row news-list">
            <div class="col-lg-4">
              <img class="news-img-size" src="${
                news.urlToImage ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
              }"/>
            </div>
            <div class="col-lg-8">
              <h2>${news.title == "[Removed]" ? "삭제됨" : news.title}</h2>
              <p>
                ${
                  news.description == null
                    ? "내용없음"
                    : news.description == "[Removed]"
                    ? "삭제됨"
                    : news.description
                }
              </p>
              <div>
                ${
                  news.source.name == "[Removed]" ? "삭제됨" : news.source.name
                } * ${
        news.source.name == "[Removed]"
          ? moment(news.publishedAt).fromNow()
          : moment(news.publishedAt).format("L")
      }
              </div>
            </div>
          </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorRender) => {
  const errorHTML = `<div class="alert alert-danger text-center" role="alert">${errorRender}</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};
const paginationRender = () => {
  // totalResults
  // page
  // pageSize
  // groupSize
  // totalPage
  let totalPage = Math.ceil(totalResults / pageSize);

  let pageGroup = Math.ceil(page / groupSize);

  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPage) {
    lastPage = totalPage;
  }

  let firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `<li class="page-item ${
    page === 1 ? "display-none" : ""
  }" onclick ="moveToPage(1)">
                            <a href="#" class="page-link"><<</a>
                        </li>
                        <li class="page-item ${
                          page === 1 ? "display-none" : ""
                        }" onclick ="moveToPage(${
    page === 1 ? page : page - 1
  })">
                            <a href="#" class="page-link"><</a>
                        </li>`;
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})">
                                <a href="#" class="page-link" >${i}</a>
                            </li>`;
  }
  paginationHTML += `<li class="page-item ${
    page === totalPage ? "display-none" : ""
  }" onclick ="moveToPage(${page === totalPage ? page : page + 1})">
                        <a href="#" class="page-link" >></a>
                    </li>
                    <li class="page-item ${
                      page === totalPage ? "display-none" : ""
                    }" onclick ="moveToPage(${totalPage})">
                        <a href="#" class="page-link">>></a>
                    </li>`;

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log("move", pageNum);
  page = pageNum;
  getNews();
};
// const PreviousPage=()=>{
//     page >1? page = page-1: '' ;
//     getNews();
// }
// const Next = (totalPage)=>{
//     page < totalPage ? page = page+1:'';
//     getNews();
// }

const openMenu = (event) => {
  sideBar.style.left = 0 + "px";
};
const closeMenu = (event) => {
  sideBar.style.left = -310 + "px";
};
const search = () => {
  searchToggle = !searchToggle;
  if (searchToggle === true) {
    searchBox.style.display = "block";
  } else {
    searchBox.style.display = "none";
  }
};

getLatestNews();
