import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import type { SwiperProps } from './utils';
import type { TabScreenProps } from './TabScreen';
import { TabsContext } from './context';


function Swiper(props: SwiperProps) {
  const {
    defaultIndex,
    onChangeIndex,
  } = props;
  const [index, setIndex] = React.useState<number>(defaultIndex || 0);
  const goTo = React.useCallback(
    (ind: number) => {
      setIndex(ind);
      onChangeIndex(ind);
    },
    [setIndex, onChangeIndex]
  );

  let children: React.Component<TabScreenProps>[] = props.children;

  const currentScreen = children[index];
  if (!currentScreen) {
    return null;
  }
  

  return (
    <View style={styles.root} >
      <TabsContext.Provider value={{ goTo, index }}>
        {currentScreen}
      </TabsContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Swiper;
