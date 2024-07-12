import styled from 'styled-components/native';


export const DateTimeArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    font-size: 17px;
    padding: 10px;
    border-radius: 8px;
    color: #121212;
    margin-bottom: 15px;
`;

export const SelectionArea = styled.Text`  
    width: 90%;
    font-size: 17px;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 15px;
`;

export const DescriptionInput = styled.TextInput`
    height: 90px;
    background-color: #FFF;
    width: 90%;
    font-size: 17px;
    padding: 10px;
    border-radius: 8px;
    color: #121212;
    margin-bottom: 15px;
`;

export const CancelButton = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
    width:90%;
    height:45px;
    border-width:1px;
    border-radius:8px;
    border-color:#C62c36;
`;

export const CancelText = styled.Text`
    font-size: 18px;
    font-weight:bold;
    color:#C62c36;
`;