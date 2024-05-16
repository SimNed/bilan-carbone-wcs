import BaseButton from "@/components/Buttons/BaseButton/BaseButton";
import { Form } from "@/components/FormElements/Form/Form.styled";
import { enqueueSnackbar } from "notistack";
import {
  FormTitle,
  FormViewStyled,
} from "@/components/FormElements/FormView/FormView.styled";
import {
  FormLabelWithField,
  FormSelect,
  FormTextField,
} from "@/components/FormElements/Inputs/FormInputs";
import {
  CreateRideFormMutation,
  CreateRideFormMutationVariables,
  GetTransportationsQuery,
} from "@/gql/graphql";
import { capitalizeFirstLetter } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { CREATE_RIDE } from "@/api-gql/mutations/ride.mutations";
import { GET_TRANSPORTATIONS } from "@/api-gql/queries/transportation.queries";

export default function RideFormView() {
  const [formData, setFormData] = useState<CreateRideFormMutationVariables>({
    label: "",
    distance: 0,
    date: "",
    transportationId: 1,
  });

  const { data } = useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);
  const formRef = useRef<HTMLFormElement>(null);

  const updateFormData = (
    partialFormData: Partial<CreateRideFormMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [createRideMutation] = useMutation<
    CreateRideFormMutation,
    CreateRideFormMutationVariables
  >(CREATE_RIDE);

  const createRide = async () => {
    const { data } = await createRideMutation({
      variables: {
        label: formData.label,
        distance: formData.distance,
        date: formData.date,
        transportationId: formData.transportationId,
      },
    });

    if (data) {
      enqueueSnackbar("trajet enregistré !", { variant: "success" });
      if (formRef.current) formRef.current.reset();
    } else {
      enqueueSnackbar("erreur d'enregistrement", { variant: "error" });
    }
  };

  return (
    <>
      <FormViewStyled>
        <FormTitle>Nouveau trajet :</FormTitle>
        <Form
          ref={formRef}
          aria-label="form"
          onSubmit={(event) => {
            event.preventDefault();
            createRide();
          }}
        >
          <FormLabelWithField>
            Nom du trajet:
            <FormTextField
              type="text"
              required
              minLength={2}
              onChange={(event) => {
                updateFormData({ label: event.target.value });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Distance en km:
            <FormTextField
              type="number"
              min={0}
              required
              onChange={(event) => {
                updateFormData({ distance: parseInt(event.target.value) });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Date:
            <FormTextField
              type="date"
              required
              onChange={(event) => {
                updateFormData({
                  date: new Date(event.target.value).toISOString(),
                });
              }}
            />
          </FormLabelWithField>
          <FormLabelWithField>
            Moyen de transport:
            <FormSelect
              required
              onChange={(event) => {
                updateFormData({
                  transportationId: parseInt(event.target.value),
                });
              }}
            >
              {data?.transportations.map((transportation) => (
                <option value={transportation.id}>
                  {capitalizeFirstLetter(transportation.label)}
                </option>
              ))}
            </FormSelect>
          </FormLabelWithField>
          <BaseButton>Ajouter mon trajet</BaseButton>
        </Form>
      </FormViewStyled>
    </>
  );
}
