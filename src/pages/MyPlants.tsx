import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import colors from '../styles/colors';
import waterDrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { PlantProps, loadPlant, removePlant } from '../libs/storage';
import { Load } from '../components/Load';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Não 😅',
                style: 'cancel',
            },
            {
                text: 'Sim 😰',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);
                        setMyPlants((oldData) =>
                            oldData.filter((item) => item.id !== plant.id)
                        );
                    } catch (error) {
                        Alert.alert('Não foi possível remover! 🤔')
                    }
                },
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWatered(
                `Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}.`
            );
            setMyPlants(plantsStoraged);
            setLoading(false);
        };

        loadStorageData();
    }, [])

    if (loading)
        return <Load />
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.spotlight}>
                <Image
                    source={waterDrop}
                    style={styles.spotlightImage}
                />

                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas Regadas
                </Text>

                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                            data={item}
                            handleRemove={() => { handleRemove(item) }}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: colors.background,
    },
    spotlight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        borderRadius: 20,
        padding: 20,
        marginTop: 10,
    },
    spotlightImage: {
        width: 50,
        height: 50,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingLeft: 20,
        fontFamily: fonts.text,
        fontSize: 15,
    },
    plants: {
        flex: 1,
        width: '100%',
        marginTop: 15,
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    },
})