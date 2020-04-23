import React, { Component } from 'react'
import { Text, View, Dimensions, Image, StyleSheet, ScrollView, Button, Linking, TouchableOpacity, StatusBar, RefreshControl, FlatList, TextInput } from 'react-native';
import { stateWise, district } from './src/apicards';
// import { AreaChart, Grid, LineChart } from 'react-native-svg-charts'

const screenWidth = Dimensions.get("window").width;
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
};
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            Data: [],
            promotorData: [],
            dateTime: [],
            refreshing: false,
            searchedState: [],
            allData: [],
            dayCalc: {
                labels: []
            }
        };

    }
    async componentDidMount() {

        // this._preload();
        // this.connectionCheck();
        let dataimg = await stateWise();
        let a = [];
        dataimg.cases_time_series.forEach(function (obj) {
            a.push(obj.totalconfirmed)
            console.log('date : ', a);
        });
        // console.log("State", dataimg);
        // for(let a of dataimg.cases_time_series){

        // }
        let Detailsstaff = await district();
        console.log("District", Detailsstaff);
        this.setState({ allData: dataimg, searchedState: Detailsstaff, dateTime: a }, () => console.log("auto complete search", this.state));

    }

    searchedAdresses = (searchedText) => {
        console.log('searchedText', searchedText);

        var d = this.state.allData.statewise.filter((item) => {
            return item.state.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
        });
        console.log(d)
    };
    render() {
        const data = {
            labels: ["January", "February", "March", "April"],
            datasets: [
                {
                    data: [20, 45, 28, 80, 99, 43, 50],
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
                }
            ],
        };
        return (

            <ScrollView style={{ flex: 1 }} refreshControl={

                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}

                />
            }>

                <StatusBar hidden={true} />
                {/* <View style={{ position: 'relative', paddingBottom: 10 }}>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={this.searchedAdresses}
                        placeholder='search'
                        placeholderStyle={{ color: 'red' }} />
                </View> */}

                <View style={{ position: 'relative', padding: 15 }}>
                    <Text>
                        data
                    </Text>
                </View>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                />
                {/* <LineChart
                    style={{ height: 200 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Grid />
                </LineChart> */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({})