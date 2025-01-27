import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {useSelector} from 'react-redux';

const CustomInput = (props: TextInputProps) => {
  const theme = useSelector(state => state.theme.theme);

  return (
    <TextInput
      {...props}
      placeholderTextColor={theme.colors.textSecondary}
      style={[
        styles.input,
        {
          color: theme.colors.inputs.color,
          borderColor: theme.colors.inputs.borderColor,
          backgroundColor: theme.colors.inputs.backgroundColor,
        },
        props.style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 50,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
  },
});

export default CustomInput;
