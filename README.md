API를 활용해 뉴스타임즈 만들기

1.반응형웹페이지

1-1) pc버전은 가로형 메뉴버튼 모바일 버전은 햄버거 메뉴버튼

2.API 호출해서 웹페이지에 뉴스렌더링

2-1) 호출된 뉴스정보가 부족한 경우 '내용없음'등으로 나타나게 구현

3.API에서 제공하는 카테고리나 검색어 뉴스 렌더링

3-1) 돋보기아이콘 클릭 시 검색창 오픈

4.반복되는 코드 리팩토링

5.오류 핸들링 try catch 사용

6.페이지네이션

6-1)'>''<' 클릭시 1페이지씩 이동 '>>''<<'클릭시 마지막페이지 || 첫 페이지로 이동 구현

6-2)페이지=1 or 마지막페이지인 경우 페이지 이동버튼 숨김처리
