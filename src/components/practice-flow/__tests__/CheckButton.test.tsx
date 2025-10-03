import { render, fireEvent } from "@testing-library/react-native";
import CheckButton from "../CheckButton";

describe("CheckButton", () => {
  it("renders with default text", () => {
    const onPress = jest.fn();

    const { getByText } = render(
      <CheckButton onPress={onPress} disabled={false} />,
    );

    expect(getByText("Check")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();

    const { getByText } = render(
      <CheckButton onPress={onPress} disabled={false} />,
    );

    fireEvent.press(getByText("Check"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();

    const { getByText } = render(
      <CheckButton onPress={onPress} disabled={true} />,
    );

    fireEvent.press(getByText("Check"));

    expect(onPress).not.toHaveBeenCalled();
  });
});
