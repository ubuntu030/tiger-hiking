import { gql, useMutation } from "@apollo/client";
import { useToast } from "./useToast";
import { GET_ALL_ACTIVITIES } from "../graphql/queries";
// import { MY_ACTIVITIES_QUERY } from "./useMyActivities";

const CANCEL_REGISTRATION_MUTATION = gql`
  mutation CancelRegistration($registrationId: ID!) {
    cancelRegistration(registrationId: $registrationId) {
      success
      message
    }
  }
`;

export const useCancelRegistration = () => {
  const { showToast } = useToast();
  const [cancel, { loading, error }] = useMutation(
    CANCEL_REGISTRATION_MUTATION,
    {
      refetchQueries: [{ query: GET_ALL_ACTIVITIES }],
      onCompleted: (data) => {
        if (data.cancelRegistration.success) {
          showToast("報名已取消", "success");
        } else {
          showToast(
            data.cancelRegistration.message || "取消報名失敗",
            "error"
          );
        }
      },
      onError: (err) => {
        showToast(err.message || "取消報名時發生錯誤", "error");
      },
    }
  );

  const cancelRegistration = (registrationId: number) => {
    cancel({ variables: { registrationId } });
  };

  return { cancelRegistration, loading, error };
};
