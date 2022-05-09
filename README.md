# 레이서 포트폴리오 서비스

이 프로젝트는 자기자신의 포트폴리오를 작성하고, 또한 다른 사람의 포트폴리오를 확인할 수 있는 웹 서비스입니다. 

## 서비스의 주요 기능
#### 1. 포트폴리오 관리 서비스
- My Page에서 자신의 학력, 수상이력, 프로젝트, 자격증에 대한 내역을 추가, 편집, 삭제하며 이력을 관리할 수 있습니다.
#### 2. 포트폴리오 공유 및 네트워크 서비스
- Network page를 통해 다른 사람들의 포트폴리오를 살펴볼 수 있습니다.
- 다른 사람의 포트폴리오 페이지를 방문해 방명록을 남기며 소통할 수 있습니다.
#### 3. 이력 검색 서비스
- Search page를 통해 다른 사람들의 학력, 수상이력, 프로젝트, 자격증에 대한 이력을 검색하여 조회할 수 있습니다.

## 주요 사용 기술

1. 프론트엔드

- React (create-react-app으로 구현되었습니다.)
- React Bootstrap
- axios

2. 백엔드

- Express (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose

## 설치 방법

1. 프론트 엔드 서버 실행

```bash
cd front
yarn
yarn start
```

2. 백엔드 서버 실행

```bash
back 폴더 내부 README 참고
```

## 서비스 소개
### 1. 로그인 화면
##### 1-1. 로그인 화면
![image1](https://user-images.githubusercontent.com/72954099/167449442-957aafaf-b127-424b-b922-b5bcd5cea18d.png) <br>

- [로그인]: 로그인을 할 수 있다.
- [회원가입]: 회원가입을 통해 로그인을 할 수 있다.
- [다크모드]: 왼쪽 아래의 해 모양의 아이콘을 통해 다크모드로 이용할 수 있다.

##### 1-2. 회원가입 화면
![image2](https://user-images.githubusercontent.com/72954099/167450109-44567a8c-d5f0-4292-91ea-b632a7c116ca.png)
 <br>
- [회원가입]: 이메일 주소, 비밀번호, 이름 입력을 통해 회원가입을 할 수 있다.
- [로그인 하기]: 로그인 화면으로 되돌아 간다.

### 2. 포트폴리오 화면
##### 2-1. 포트폴리오 화면
![image3](https://user-images.githubusercontent.com/72954099/167450181-c54a9b4f-fe8a-43c6-a259-86a7e7dee56a.png)

<br>

##### 2-2. 다른 유저의 포트폴리오 화면
![image4](https://user-images.githubusercontent.com/72954099/167450259-e5c875e8-8b5c-446a-82ab-53875d6a9abf.png)

<br>

##### 2-3. 프로필 화면
![image5](https://user-images.githubusercontent.com/72954099/167450313-1bf02278-b298-4934-b994-c2ea53cd2a0f.png)
![image5-2](https://user-images.githubusercontent.com/72954099/167451430-3d257f34-9f8e-45c3-b088-e2728e4e3f40.png)
<br>
- [편집]: 편집 버튼을 통해 이름, 이메일, 설명, 사진을 수정할 수 있다.

##### 2-4. 방명록 화면
![image6](https://user-images.githubusercontent.com/72954099/167451495-d4d38fba-7c36-4195-b67b-092916028b06.png)
<br>
- [등록]: 방명록 입력 후 등록 버튼을 통해 방명록을 남길 수 있다.
- [수정]: 연필 모양의 아이콘을 통해 수정을 할 수 있다.
- [삭제]: 휴지통 모양의 아이콘을 통해 삭제를 할 수 있다.

##### 2-5. 게시물 화면
![image7](https://user-images.githubusercontent.com/72954099/167451557-6e0c740b-43f9-4292-a0c0-449d7801c972.png)
<br>
- [추가]: + 버튼을 통해 게시물을 추가할 수 있다.
- [편집]: 편집 버튼을 통해 게시물을 수정 할 수 있다.
- [삭제]: 삭제 버튼을 통해 게시물을 삭제 할 수 있다.

### 3. 검색 화면
##### 3-1. 검색 전체 화면
![image8](https://user-images.githubusercontent.com/72954099/167451592-97d3b99e-dfa9-45e0-81a0-1dd2fce4f7d0.png)
<br>
- [검색]: 검색창을 통해 항목(학력, 수상이력, 프로젝트, 자격증) 별로 검색할 수 있다.
- [해당 포트폴리오로 이동]: 게시물의 오른쪽 화살표 버튼을 통해 해당 게시물이 속한 포트폴리오 페이지로 이동할 수 있다.

##### 3-2. 검색창
![image9-1](https://user-images.githubusercontent.com/72954099/167451658-ba7a785c-4ee5-48bf-90ea-0fdfe7a25cf7.png)
<br>
![image9-2](https://user-images.githubusercontent.com/72954099/167451695-319ee673-cdc7-400c-ae23-db682cfdf7bb.png)
<br>
![image9-3](https://user-images.githubusercontent.com/72954099/167451738-052a1b84-04da-4673-8ce7-fa43d0d89a33.png)
<br>
![image9-4](https://user-images.githubusercontent.com/72954099/167451792-7efe0547-6314-4765-9bc1-aa5bdce74982.png)
<br>
- [검색 항목 선택]: 셀렉트박스를 통해 검색하고자 하는 항목 중 하나(학력, 수상이력, 프로젝트, 자격증)를 선택할 수 있다.
- [검색 버튼]: 입력 내용이 하나라도 있어야 검색 버튼이 활성화 된다.

### 4. 네트워크 화면
##### 4-1. 네트워크 전체 화면
![image10](https://user-images.githubusercontent.com/72954099/167451847-8d6009a8-3fcf-4868-9be4-108305833d4a.png)
<br>
- 서비스를 이용하는 유저들 목록을 볼 수 있다.
- [유저 포트폴리오로 이동]: 유저 카드의 '포트폴리오' 링크를 클릭하면 해당 유저의 포트폴리오 페이지로 이동할 수 있다.
- [목록의 유저수 선택]: 화면 아래에 위치한 셀렉트박스를 통해 네트워크 페이지에 보여지는 유저수(4, 8, 16, 32)를 선택할 수 있다.

##### 4-2. 검색창
![image11](https://user-images.githubusercontent.com/72954099/167451907-cb09cde4-3519-48e6-9ea8-7a57a281b10c.png)
<br>
- [검색 항목 선택]: 셀렉트박스를 통해 검색하고자 하는 항목 중 하나(이름, 이메일)를 선택할 수 있다.
- [검색 버튼]: 입력 내용이 한 글자라도 있어야 검색 버튼이 활성화 된다.
- [전체 버튼]: 전체 유저 목록을 보여준다.

### 5. 다크모드
![image12](https://user-images.githubusercontent.com/72954099/167451961-c8189e4b-4fcf-4317-969e-a9c7fd7de73d.png)


## 🙏 개발자들
|이름|포지션|
|------|---|
|이동준|팀장, 백엔드|
|김영곤|백엔드|
|박보근|프론트엔드|
|이영민|프론트엔드|
|선민경|프론트엔드|

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.
