import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../../components/Themed';
import {useEffect, useState} from 'react';
import Parse from 'parse/react-native.js';

export default function TabOneScreen() {

  const [refresh, setRefresh] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const Movie = Parse.Object.extend('Movies');
    const query = new Parse.Query(Movie);

    async function fetchMovies() {
      try {
        const results: any = await query.find();
        setMovies(results);
        setRefresh(false);
      } catch (error) {
        console.error('Error querying database:', error);
      }
    }

    fetchMovies();
  }, [refresh]);

  const toggleWatched = async (id: string) => {
    const Movie = Parse.Object.extend('Movies');
    const query = new Parse.Query(Movie);

    try {
      const movie = await query.get(id);
      movie.set('isWatched', !movie.get('isWatched'));
      await movie.save();
      setRefresh(true);
    } catch (error) {
      console.error('Error toggling watched status:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => toggleWatched(item.id)} style={{marginTop: 10}}>
            <Text style={{fontSize: 16}}>
              {item.get('isWatched') ? '✔️' : '❌'} {item.get('name')} ({item.get('releaseYear')})
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
