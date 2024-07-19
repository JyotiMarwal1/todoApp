import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { Fonts, colors } from '../themes';

const Timer = ({ initialTime, onTimeout, running }) => {
    const [time, setTime] = useState(initialTime); // State to handle the time remaining
    const intervalRef = useRef(); // Ref to store the interval ID

    useEffect(() => {
        if (running) {
            startTimer(); // Start the timer when running prop is true
        } else {
            pauseTimer(); // Pause the timer when running prop is false
        }
    }, [running]);

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current); // Clean up the interval when the component is unmounted
        };
    }, []);

    const startTimer = () => {
        if (!intervalRef.current) {
            setTime(initialTime); // Reset the time to initialTime
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        }
    };

    const pauseTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const resetTimer = () => {
        pauseTimer();
        setTime(initialTime);
    };

    useEffect(() => {
        if (time === 0) {
            pauseTimer();
            onTimeout && onTimeout();
        }
    }, [time]);

    return (
        <View>
            <Text style={{ fontFamily: Fonts.FONT_FAMILY_SEMIBOLD, color: colors.black }}>{time <= 9 ? `00:0${time}` : `00:${time}`}</Text>
        </View>
    );
};

export default Timer;