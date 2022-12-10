<p align=center><img src=https://user-images.githubusercontent.com/97138102/206835586-f3a28009-c9a1-47c5-8cd7-1331c935e60b.png>


# 🦝 raccoon talk

### 채팅 사이트
  소개 : socket.io를 이용한 단체 채팅 및 DM 기능이 있는 실시간 채팅 사이트

# 📅 기간
2022.09.14 ~ 2022.09.16

## ✉️ 실시간 채팅
![image](https://user-images.githubusercontent.com/97138102/206835956-0cca6996-db58-49d5-b856-e924d4bfae5d.png)
#### socket.io 모듈 설치

### 입장/ 퇴장 기능
![ezgif com-gif-maker (10)](https://user-images.githubusercontent.com/97138102/206836005-2b613955-06d7-4f48-bf3e-d502def3e7cb.gif)

#### 🙋‍♀️ 입장

##### nickname 입력 후 입장 시 nickname value 서버로 전송
  - 서버에서 중복 nickname 확인 후 입장
  - user list에 nickname 저장
    - socket ID : nickname (배열저장)
    - option value 값 nickname 저장
  
##### 입장 성공
  - 다른 유저에게 입장 안내 출력 (OO 님이 입장했습니다.)

#### 🙇‍♀️ 퇴장

##### 퇴장 
  - 새로고침 시 다른 유저에게 퇴장 안내 출력 (OO 님이 퇴장했습니다.)
  - user list 에서 새로고침 한 유저의 nickname delete
  
  
### 채팅 기능

#### 전체 채팅

![ezgif com-gif-maker (14)](https://user-images.githubusercontent.com/97138102/206838405-b74da06d-4e99-4abc-a3f2-accb7c3336a3.gif)

  - msg 전송 시 모든 유저에게 name과 msg 전달
   
#### DM

![ezgif com-gif-maker (16)](https://user-images.githubusercontent.com/97138102/206838379-8788f5ed-d3cc-465f-b9d8-bad4392a054f.gif)

  - option 에서 user 선택
    - 해당 user에게만 보이는 채팅 전송 가능
    - 다른 유저에겐 보이지 않음


  

