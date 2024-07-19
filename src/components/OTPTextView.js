import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Fonts from '../assets/fonts';
import { moderateScale } from '../utils/ScalingUtils';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: moderateScale(10)
    },
    textInput: {
        height: moderateScale(50),
        width: 40,
        borderBottomWidth: 1,
        margin: 5,
        textAlign: 'center',
        fontSize: moderateScale(26),
        fontWeight: '800',
        color: '#000000',
        fontFamily: Fonts.Inter_Black_Bold,
        backgroundColor: '#fff',

    },
});

const getOTPTextChucks = (inputCount, inputCellLength, text) => {
    let otpText =
        text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || [];

    otpText = otpText.slice(0, inputCount);

    return otpText;
};

class OTPTextView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: 0,
            otpText: getOTPTextChucks(
                props.inputCount,
                props.inputCellLength,
                props.defaultValue,
            ),
            defaultValue: props.defaultValue,
        };

        this.inputs = [];
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            otpText: getOTPTextChucks(
                nextProps.inputCount,
                nextProps.inputCellLength,
                nextProps.defaultValue,
            ),
        });
    }

    basicValidation = text => {
        const validText = /^[0-9a-zA-Z]+$/;
        return text.match(validText);
    };

    onTextChange = (text, i) => {
        const { inputCellLength, inputCount, handleTextChange } = this.props;

        if (text && !this.basicValidation(text)) {
            return;
        }

        this.setState(
            prevState => {
                let { otpText } = prevState;

                otpText[i] = text;
                return {
                    otpText,
                };
            },
            () => {
                handleTextChange(this.state.otpText.join(''));
                if (text.length === inputCellLength && i !== inputCount - 1) {
                    this.inputs[i + 1].focus();
                }
            },
        );
    };

    onInputFocus = i => {
        const { otpText } = this.state;

        const prevIndex = i - 1;

        if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
            this.inputs[prevIndex].focus();
            return;
        }

        this.setState({ focusedInput: i });
    };

    onKeyPress = (e, i) => {
        const val = this.state.otpText[i] || '';

        if (e.nativeEvent.key === 'Backspace' && i !== 0 && !val.length) {
            this.inputs[i - 1].focus();
        }
    };

    clear = () => {
        this.setState(
            {
                otpText: [],
            },
            () => {
                this.inputs[0].focus();
                this.props.handleTextChange('');
            },
        );
    };

    setValue = value => {
        const { inputCount, inputCellLength } = this.props;

        const updatedFocusInput = value.length - 1;

        this.setState(
            {
                otpText: getOTPTextChucks(inputCount, inputCellLength, value),
            },
            () => {
                if (this.inputs[updatedFocusInput]) {
                    this.inputs[updatedFocusInput].focus();
                }

                this.props.handleTextChange(value);
            },
        );
    };

    render() {
        const {
            inputCount,
            offTintColor,
            tintColor,
            inputCellLength,
            containerStyle,
            textInputStyle,
            keyboardType,
            ...textInputProps
        } = this.props;

        const { focusedInput, otpText } = this.state;

        const TextInputs = [];

        for (let i = 0; i < inputCount; i += 1) {
            const inputStyle = [
                styles.textInput,
                textInputStyle,
                { borderColor: offTintColor },
            ];

            if (focusedInput === i) {
                inputStyle.push({ borderColor: tintColor });
            }

            TextInputs.push(
                <TextInput
                    ref={e => {
                        this.inputs[i] = e;
                    }}
                    key={i}
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    autoFocus={false}
                    value={otpText[i] || ''}
                    style={inputStyle}
                    maxLength={this.props.inputCellLength}
                    onFocus={() => this.onInputFocus(i)}
                    onChangeText={text => this.onTextChange(text, i)}
                    multiline={false}
                    onKeyPress={e => this.onKeyPress(e, i)}
                    secureTextEntry={true}
                    {...textInputProps}
                />,
            );
        }

        return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
    }
}

OTPTextView.propTypes = {
    defaultValue: PropTypes.string,
    inputCount: PropTypes.number,
    containerStyle: PropTypes.any,
    textInputStyle: PropTypes.any,
    inputCellLength: PropTypes.number,
    tintColor: PropTypes.string,
    offTintColor: PropTypes.string,
    handleTextChange: PropTypes.func,
    inputType: PropTypes.string,
    keyboardType: PropTypes.string,
};

OTPTextView.defaultProps = {
    defaultValue: '',
    inputCount: 4,
    tintColor: '#3CB371',
    offTintColor: '#DCDCDC',
    inputCellLength: 1,
    containerStyle: {},
    textInputStyle: {},
    handleTextChange: () => { },
    keyboardType: 'numeric',
};

export default OTPTextView;