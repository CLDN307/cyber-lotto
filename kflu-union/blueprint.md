# KFLU Union - Blueprint

## Overview
한국노총 전국공공노동조합연맹 건설노조 경기남부본부의 공식 웹사이트입니다. 이 웹사이트는 본부 소개, 활동 현황, 상담 및 가입 안내를 제공합니다.

## Current Project Structure
- `index.html`: 메인 페이지 및 인증 로직
- `board.html`: 조합원 전용 자유게시판 페이지
- `blueprint.md`: 프로젝트 설계 및 변경 이력 문서
- `단체.jpg`, `마크.jpg`, `임명식.jpg`, `집회.jpg`: 프로젝트 이미지 자산

## Features Implementation

### 1. Authentication (Simulated)
- **Local Storage Usage**: `localStorage`를 사용하여 사용자 정보(`kflu_users`)와 현재 로그인 세션(`kflu_user`)을 관리합니다.
- **Login/Register**: 실제 회원가입 시 데이터를 저장하고, 로그인 시 일치 여부를 확인하여 세션을 생성합니다.
- **Navigation State**: 로그인 상태에 따라 내비게이션 바의 버튼이 "로그인/회원가입"에서 "사용자 이름/로그아웃"으로 동적 변경됩니다.

### 2. Freedom Board (`board.html`)
- **Access Control**: 
    - **Public**: 누구나 게시글 목록(`post-list`)을 볼 수 있습니다.
    - **Members Only**: 게시글 상세 내용 읽기 및 새 글 쓰기는 로그인한 조합원만 가능합니다. 비로그인 사용자가 시도할 경우 로그인 안내 알림 후 로그인 모달을 표시합니다.
- **CRUD Operations**: 
    - **Read**: `localStorage`의 `kflu_posts` 데이터를 읽어와 리스트를 표시합니다. 상세 내용은 세션 확인 후 표시합니다.
    - **Create**: 로그인된 사용자 이름을 작성자로 하여 새 게시글을 등록합니다.
    - **Update/Delete**: 본인이 작성한 글에 한해 수정 및 삭제가 가능하도록 기능을 구현 완료하였습니다.
- **UI/UX**: 
    - Tailwind CSS를 사용한 모던하고 직관적인 게시판 레이아웃.
    - 글쓰기 및 글 보기 기능은 사용자 경험을 해치지 않도록 모달(Modal) 방식으로 구현했습니다.
    - 게시글 역순 정렬(최신순) 및 날짜 자동 기록.
    - **Accessibility**: 모달 접근성 속성(role="dialog" 등) 및 키보드(Esc) 조작 지원 추가.

## Future Enhancements
- **Backend Migration**: Firebase Authentication 및 Firestore Database로 데이터를 이전하여 실제 다중 사용자 환경 구축.
- **Security**: 비밀번호 해싱 및 세션 토큰 방식 도입.
