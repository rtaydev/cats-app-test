import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import Svg, { Path } from "react-native-svg";
import { theme } from '../theme';

const Logo: React.FC<{ width?: number; height?: number }> = ({ width = 343, height = 138 }) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 343 138"
  >
    <Path
      fill="#00AA28"
      d="m314.734 77.477-9.33-2.255c-10.23-2.405-13.989-5.113-13.989-10.08 0-4.966 4.966-8.273 12.636-8.273 8.726 0 15.192 3.01 25.876 10.23 1.202.751 2.254 1.355 3.009 1.355 1.505 0 2.556-.604 2.858-2.859.302-2.405.453-4.664.453-7.674 0-4.514-.151-7.523-.453-9.178-.452-2.557-1.353-3.91-3.009-4.962-8.877-5.566-18.806-7.976-29.786-7.976-24.673 0-40.771 12.037-40.771 30.54 0 13.84 10.079 24.22 27.531 28.584l9.778 2.405c12.485 3.01 13.99 5.868 13.99 10.231 0 5.113-4.363 8.575-11.585 8.575-11.433 0-19.857-4.212-29.187-13.537-1.353-1.354-2.254-2.255-3.91-2.255-1.504 0-2.707.599-3.613 2.104-5.716 9.48-10.079 12.938-16.098 12.938-6.466 0-10.98-4.514-10.98-12.787V59.124h14.177a3.432 3.432 0 0 0 3.43-3.43v-14.95a3.432 3.432 0 0 0-3.43-3.43h-14.177V19.556c0-3.91-2.557-5.415-6.467-3.764l-21.664 9.073c-1.655.75-2.556 2.104-2.556 3.91V70.85c0 26.329-17.603 44.229-40.017 44.229-11.735 0-22.414-4.514-26.329-15.947 2.708 1.051 7.222 1.504 13.688 1.504 25.876 0 43.927-14.14 43.927-34.602 0-18.202-15.042-30.239-37.46-30.239-8.324 0-16.309 1.615-23.251 4.542C132.464 15.979 108.838 0 76.198 0 61.303 0 47.766 1.806 35.276 5.566c-3.457 1.052-5.566 3.31-5.566 6.768V71.76c-7.523-3.01-13.24-7.523-18.05-13.688-1.053-1.354-1.807-2.259-3.463-2.259-2.405 0-3.91 1.806-3.91 4.212 0 10.23 12.037 23.768 25.423 30.39v40.949a3.43 3.43 0 0 0 3.43 3.43h26.837a3.43 3.43 0 0 0 3.43-3.43v-31.02c1.957.15 3.91.301 6.018.301 17.745 0 31.08-2.771 40.858-9.087 1.944 26.914 21.998 45.642 52.653 45.642 15.796 0 34.451-5.566 44.832-19.706 4.967 12.037 16.698 19.706 30.989 19.706 14.292 0 22.867-3.608 30.088-11.886 9.325 7.82 19.707 11.886 33.55 11.886 24.673 0 40.319-12.334 40.319-31.744 0-13.843-7.523-23.017-27.98-27.984v.005ZM63.411 76.58V30.093c0-2.859 1.203-4.514 3.91-4.962 4.061-.75 6.769-.75 9.028-.75 18.202 0 29.036 9.626 29.036 25.574 0 16.848-12.938 26.173-41.974 26.626Zm95.016-21.362c7.221 0 11.131 4.363 11.131 10.382 0 10.08-9.028 16.848-22.414 16.848-4.664 0-7.372-.302-9.178-1.052 0-15.645 7.971-26.178 20.461-26.178Z"
    />
  </Svg>
);

const Header: React.FC = () => {
  const { colors } = theme;

  return (
    <Surface style={[styles.surface, { backgroundColor: colors.accent }]}>
      <View style={styles.container}>
        <Logo width={120} height={48} />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    width: '100%',
    elevation: 4,
    borderRadius: 0,
    alignItems: 'flex-start',
  },
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
