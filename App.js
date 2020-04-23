import React, { Component } from 'react'
import { Provider as PaperProvider, Appbar} from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { stateWise, district } from './src/apicards';
import {StyleSheet, Image, View, Text, ScrollView,RefreshControl,TouchableOpacity, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import statescreen from './src/state';
const screenWidth = Dimensions.get("window").width;


const Stack = createStackNavigator();

import {
    BarChart,
} from "react-native-chart-kit";


const styles = StyleSheet.create({
  header: {
    display:'flex',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 5,
    backgroundColor:'#473f97',
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
  mainData : {
    backgroundColor: '#473f97',
  },
  mainDataContainer: {
    width: '90%',
    backgroundColor: '#473f97',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchbarmain: {
    paddingTop: 15
  },
  searchStyle: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 50
  },
  mainContentData : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '46%',
    height: 120,
    marginTop: 30,
    marginBottom: 20,
    marginRight: 20,
    borderRadius: 18
  },
  mainContentBack1 : {
    backgroundColor : '#ffb259',
    marginBottom: 0
  },
  mainContentBack2 : {
    backgroundColor : '#ff5959',
    marginBottom: 0
  },
  mainContentBack3 : {
    backgroundColor : '#4cd97b'
  },
  mainContentBack4 : {
    backgroundColor : '#4cb5ff'
  },
  mainContentDataFont1 : {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 20
  },
  mainContentDataFont2 : {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  countData: {
    marginTop: 40,
    backgroundColor: '#fff',
    padding: 5,
    marginLeft: -15,
    marginRight: -15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  countDataText : {
    flexDirection: 'row',
    width: '100%',
    padding: 5,
    fontSize: 12,
    marginBottom: 10
  },
  countDatainnerText:{
    flexDirection: 'row',
    width: '100%',
  },
  barChart1:{
    backgroundColor: '#473f97',
    paddingTop: 30,
    paddingBottom: 50
  },
  barChart2:{
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 30,
  },
  barChart3:{
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 50 
  },
  barLabel : {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  barLabel2 : {
    fontSize: 18,
    color: '#473f97',
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  barLabel3 : {
    fontSize: 18,
    color: '#473f97',
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    borderTopLeftRadius: 40
  }
});


export default class App extends Component {
  state = {
    visible: true,
    images: [],
    ConfirmCase: [],
    recoverCase: [],
    deathCase: [],
    state: [],
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
  async componentDidMount() {

    this._preload();
    // this.connectionCheck();
    
}
_preload= async()=>{
  let dataimg = await stateWise();
  let a = [], b = [], c = [];
  dataimg.cases_time_series.forEach(function (obj) {
    a.push(obj.dailyconfirmed);
    b.push(obj.dailyrecovered);
    c.push(obj.dailydeceased);
  });
  // console.log("State", dataimg);
  // for(let a of dataimg.cases_time_series){

  // }
  let Detailsstaff = await district();
  //console.log("District", Detailsstaff);
  this.setState({ refreshing: false, allData: dataimg, state: dataimg.statewise, searchedState: Detailsstaff, ConfirmCase: a, recoverCase: b, deathCase: c }, () => console.log("auto complete search", this.state));

}


  searchedAdresses = (searchedText) => {
    //console.log('searchedText', searchedText);
    var d = this.state.allData.statewise.filter((item) => {
        return item.state.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
    });
    //console.log(d)
    this.setState({ state: d }, () => console.log("auto complete search", this.state.state));
};
onRefresh = () => {
  this.setState({ refreshing: true });
  this._preload();
};
selectState = (e) => {
  this.props.navigation.navigate('statescreen');
  console.log("selected e", e);
}
  render() {
    return (
      <ScrollView refreshControl={

        <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}

        />
    }>
        <PaperProvider>
        <Appbar.Header style={styles.header}>
            <View>
              <Image style={styles.tinyLogo} source={require('./assets/logo.png')}/>
            </View>
            <Appbar.Content  title="Covid-19" />
            <Appbar.Action icon="menu" onPress={this._handleMore} />
        </Appbar.Header>
        <View style={styles.mainData}>
          <View style={styles.mainDataContainer}>
            <View style={styles.searchbarmain}> 
                <Searchbar style={styles.searchStyle} placeholder="Search" onChangeText={this.searchedAdresses}/>
            </View>
            <View style={styles.mainContent}>
                <View>
                   <View style={{flexDirection:'row'}}> 
                      <View style={[styles.mainContentData,styles.mainContentBack1]}>
                          <Text style={styles.mainContentDataFont1}>Affected</Text>
                          <Text style={styles.mainContentDataFont2}>336,851</Text>
                      </View>
                      <View style={[styles.mainContentData,styles.mainContentBack2]}>
                          <Text style={styles.mainContentDataFont1}>Death</Text>
                          <Text style={styles.mainContentDataFont2}>336,851</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <View style={[styles.mainContentData,styles.mainContentBack3]}>
                          <Text style={styles.mainContentDataFont1}>Recovered</Text>
                          <Text style={styles.mainContentDataFont2}>336</Text>
                      </View>
                      <View style={[styles.mainContentData,styles.mainContentBack4]}>
                          <Text style={styles.mainContentDataFont1}>Active</Text>
                          <Text style={styles.mainContentDataFont2}>336</Text>
                      </View>
                    </View>
                </View>
            </View>
            <View  style={styles.countData}>
                    {
                        (this.state.state.length != 0) ? (
                            <>
                                <View style={styles.countDataText}>
                                    <Text style={{ width: '28%' }}>State</Text>
                                    <Text style={{ width: '18%' }}>Confirmed</Text>
                                    <Text style={{ width: '18%' }}>Active</Text>
                                    <Text style={{ width: '18%' }}>Recovered</Text>
                                    <Text style={{ width: '18%' }}>Deaths</Text>
                                </View>
                                {
                                    this.state.state.map((e, i) => {
                                        return (
                                            <TouchableOpacity style={styles.button} onPress={() => this.selectState(e)}>
                                                <View>
                                                    <View style={styles.countDatainnerText} >
                                                        <Text style={{ width: '28%' }}>{e.state}</Text>
                                                        <Text style={{ width: '18%' }}>{e.confirmed}</Text>
                                                        <Text style={{ width: '18%' }}>{e.active}</Text>
                                                        <Text style={{ width: '18%' }}>{e.recovered}</Text>
                                                        <Text style={{ width: '18%' }}>{e.deaths}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </>
                        ) : (<></>)
                    }
                </View>
                
          </View>
        </View>
        <View>
                      {
                        (this.state.recoverCase.length != 0) ? (
                            <>
                                <View style={styles.barChart2}>
                                    <Text style={styles.barLabel2}>Day By Day Recover list</Text>
                                    <BarChart
                                        data={{
                                            labels: ["  February", "March", "April", "May"],
                                            datasets: [
                                                {
                                                    data: this.state.recoverCase
                                                }
                                            ]
                                        }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: "#e26a00",
                                            backgroundGradientFrom: "#77f",
                                            backgroundGradientTo: "#00f",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 4
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#ffa726"
                                            }
                                        }}
                                        bezier
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16
                                        }}
                                    />
                                </View>
                            </>
                        ) : (<>

                        </>
                            )
                    }
                    {
                        (this.state.ConfirmCase.length != 0) ? (
                            <>
                                <View style={styles.barChart1}>
                                    <Text style={styles.barLabel}>Day By Day Confirm list</Text>
                                    <BarChart
                                        data={{
                                            labels: ["February", "March", "April", "May"],
                                            datasets: [
                                                {
                                                    data: this.state.ConfirmCase
                                                }
                                            ]
                                        }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: "#fff",
                                            backgroundGradientFrom: "#fafafa",
                                            backgroundGradientTo: "#fff",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `#77f`,
                                            labelColor: (opacity = 1) => `#77f`,
                                            style: {
                                                borderRadius: 4
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#ffa726"
                                            }
                                        }}
                                        bezier
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16
                                        }}
                                    />
                                </View>
                            </>
                        ) : (<>

                        </>
                            )
                    }
                    {
                        (this.state.deathCase.length != 0) ? (
                            <>
                                {/* <BarChart
                                    data={dataDeath}
                                    width={screenWidth}
                                    height={220}
                                    chartConfig={chartConfig}
                                    verticalLabelRotation={30}
                                /> */}
                                <View style={styles.barChart3}>
                                    <Text style={styles.barLabel3}>Day By Day Deceased list</Text>
                                    <BarChart
                                        data={{
                                            labels: ["January", "February", "March", "April", "May"],
                                            datasets: [
                                                {
                                                    data: this.state.deathCase
                                                }
                                            ]
                                        }}
                                        width={Dimensions.get("window").width} // from react-native
                                        height={220}
                                        chartConfig={{
                                            backgroundColor: "#e26a00",
                                            backgroundGradientFrom: "#a92015",
                                            backgroundGradientTo: "#a92015",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 4
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#ffa726"
                                            }
                                        }}
                                        bezier
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16
                                        }}
                                    />
                                </View>
                            </>
                        ) : (<>

                        </>
                            )
                    }

                </View>
      </PaperProvider>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="statescreen" component={statescreen} />
          </Stack.Navigator>
      </NavigationContainer>
      </ScrollView>
    )
  }
}
