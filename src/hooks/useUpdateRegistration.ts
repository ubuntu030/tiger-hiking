import { useMutation } from '@apollo/client';
import { UPDATE_REGISTRATION } from '../graphql/queries';
import { useToast } from './useToast';

interface UpdateRegistrationVariables {
  registrationId: string;
  plan?: string;
  hikingExperience?: string;
}

export const useUpdateRegistration = () => {
  const { showToast } = useToast();
  const [mutate, { loading, error }] = useMutation(
    UPDATE_REGISTRATION,
    {
      onCompleted: (data) => {
        if (data.updateRegistration.success) {
          showToast('更新成功', 'success');
        } else {
          showToast(`更新失敗: ${data.updateRegistration.message}`, 'error');
        }
      },
      onError: (err) => {
        showToast(`更新失敗: ${err.message}`, 'error');
      },
    }
  );

  const updateRegistration = (variables: UpdateRegistrationVariables) => {
    return mutate({ variables });
  };

  return { updateRegistration, loading, error };
};
