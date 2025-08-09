import { gql } from '@apollo/client';

export const GET_CONTRIBUTION = gql`
  query GetContributions($username: String!) {
    user(login: $username) {
      avatarUrl
      login
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;
