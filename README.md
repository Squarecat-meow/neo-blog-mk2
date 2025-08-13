## `.env`에 필요한 것들

- `DATABASE_URL`: prisma가 꺼내쓸 데이터베이스의 URL. "postgres://userid:password@localhost:5432/database"의 형식.
- `INVITE_CODE`: 블로그 회원가입할 때 받을 초대코드의 string.
- `JWT_SECRET`: JWT 사이닝을 할 때 쓸 256bit짜리 string.
- `NEXT_PUBLIC_APP_URL`: 배포할 사이트의 URL. 개발환경이라면 `http://localhost:3000`.
- `NEXT_PUBLIC_GITHUB_TOKEN`: 메인화면의 Github 히트맵을 가져올 때 쓸 Github 토큰. Github의 Fine-grained Token에서 가져오면 됨.
- 버킷 업로드에 쓸 것들
  - `BACKBLAZE_BUCKET`: 버킷 ID.
  - `BACKBLAZE_ENDPOINT`: 버킷 엔드포인트.
  - `BACKBLAZE_REGION`: 버킷 리전. 엔드포인트 안에 있음.
  - `BACKBLAZE_APPLICATION_ID`: 내 계정의 Application Key ID.
  - `BACKBLAZE_APPLICATION_KEY`: 내 계정의 Application Key.
