// DashboardStyles.js
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
    },
    header: {
        fontSize: 20,
      
        textAlign: 'center',
    },
    button: {
        width: '100%',
        padding: 15,
        color: 'white',
        backgroundColor: 'rgba(49, 81, 30, 0.9)',
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
      },
      buttonText: {
        color: '#000',
        backgroundColor: 'rgba(49, 81, 30, 0.9)',
      },

    label: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 8,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom: 16,
    },
    dropdownText: {
        fontSize: 16,
    },
    dropdownList: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 16,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dropdownItemText: {
        fontSize: 16,
    },
    cardContainer: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTextContainer: {
        marginLeft: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardValue: {
        fontSize: 16,
    },
    cardPercentage: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoTextContainer: {
        marginLeft: 16,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 16,
    },
    green: {
        color: 'green',
    },
    orange: {
        color: 'orange',
    },
    red: {
        color: 'red',
    },

        container: {
            flex: 1,
            padding: 16,
            backgroundColor: '#fff',
        },
        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom:0,
            paddingTop: 25,
        },
        header: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 8,
        },
        cardContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        card: {
            width: '48%', // Adjust width to fit two cards in a row
            backgroundColor: '#f9f9f9',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            elevation: 2,
        },
        cardImage: {
            width: '100%',
            height: 100,
            borderRadius: 4,
            marginBottom: 8,
        },
        cardTitle: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        cardValue: {
            fontSize: 14,
        },
        cardPercentage: {
            fontSize: 14,
            fontWeight: 'bold',
        },
        goFieldButton: {
            marginTop: 8,
            backgroundColor: 'rgba(49, 81, 30, 0.9)',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
        },
        red: {
            color: 'red',
        },
        orange: {
            color: 'orange',
        },
        green: {
            color: 'green',
        },

});

export default styles;