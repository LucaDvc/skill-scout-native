import React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';
import { Icon } from '@ui-kitten/components';

export const EmailIcon = (style) => <Icon {...style} name='email' />;

export const PersonIcon = (style) => <Icon {...style} name='person' />;

export const PlusIcon = (style) => <Icon {...style} name='plus' />;

export const BackIcon = (style) => <Icon {...style} name='arrow-back' />;

export const SettingsIcon = (style) => <Icon {...style} name='settings' />;

export const EditIcon = (style) => <Icon {...style} name='edit' />;

export const ArrowRightIcon = (style) => <Icon {...style} name='arrow-right' />;

export const ArrowLeftIcon = (style) => <Icon {...style} name='arrow-left' />;

export const CheckmarkIcon = (style) => <Icon {...style} name='checkmark' />;

export const DoneAllIcon = (style) => <Icon {...style} name='done-all' />;

export const CheckmarkCircleIcon = (style) => <Icon {...style} name='checkmark-circle' />;

export const LockIcon = (style) => <Icon {...style} name='lock' />;

export const PeopleIcon = (props) => <Icon {...props} name='people' />;

export const StarIcon = (props) => <Icon {...props} name='star' />;

export const ForwardIcon = (props) => <Icon {...props} name='arrow-forward' />;

export const RefreshIcon = (props) => <Icon {...props} name='refresh' />;

export const HeartOutlineIcon = (props) => <Icon {...props} name='heart-outline' />;

export const HeartIcon = (props) => <Icon {...props} name='heart' />;

export const ClockOutlineIcon = (props) => <Icon {...props} name='clock-outline' />;

export const BarChart2OutlineIcon = (props) => (
  <Icon {...props} name='bar-chart-2-outline' />
);

export const FolderOutlineIcon = (props) => <Icon {...props} name='folder-outline' />;

export const ListOutlineIcon = (props) => <Icon {...props} name='list-outline' />;

export const PersonDoneOutlineIcon = (props) => (
  <Icon {...props} name='person-done-outline' />
);

export const PeopleOutlineIcon = (props) => <Icon {...props} name='people-outline' />;

export const HashIcon = (props) => <Icon {...props} name='hash' />;

export const SearchIcon = (props) => <Icon {...props} name='search' />;

export const OptionsIcon = (props) => <Icon {...props} name='options-2' />;

export const ArrowIosRightIcon = (props) => <Icon {...props} name='arrow-ios-forward' />;

export const CloseIcon = (props) => <Icon {...props} name='close-outline' />;

export const TextAlignLeftIcon = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={24}
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <Path
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 18h10M4 14h16M4 10h10M4 6h16'
    />
  </Svg>
);

export const TextAlignLeftCheckedLightgrayIcon = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='12.868 4.171 500 500'
    width={24}
    height={24}
    {...props}
  >
    <Path
      stroke='#d3d3d3'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 18h10M4 14h11.83M4 10h10M4 6h16'
      style={{
        fill: '#898989',
      }}
      transform='matrix(22.33132 0 0 22.33132 -32.619 -27.27)'
    />
    <G data-name='Layer 2'>
      <Path
        d='M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.3 7.61-4.57 6a1 1 0 0 1-.79.39 1 1 0 0 1-.79-.38l-2.44-3.11a1 1 0 0 1 1.58-1.23l1.63 2.08 3.78-5a1 1 0 1 1 1.6 1.22z'
        data-name='checkmark-circle-2'
        style={{
          fill: '#d3d3d3',
        }}
        transform='matrix(8.37424 0 0 8.37424 309.29 270.737)'
      />
    </G>
  </Svg>
);

export const VideoIcon = (props) => <Icon {...props} name='video' />;

export const VideoCheckedIcon = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 500 500'
    width={24}
    height={24}
    {...props}
  >
    <G data-name='Layer 2'>
      <Path
        d='M391.54 136.72a31.696 31.696 0 0 0-34.493 5.594l-40.086 37.29v-27.035a55.934 55.934 0 0 0-55.935-55.935H93.224a55.934 55.934 0 0 0-55.935 55.935v149.158a55.934 55.934 0 0 0 55.935 55.934h167.802a55.934 55.934 0 0 0 55.935-55.934v-27.035l40.272 37.29a32.442 32.442 0 0 0 21.628 8.39 31.323 31.323 0 0 0 12.865-2.797 29.832 29.832 0 0 0 18.645-27.594V164.315a29.832 29.832 0 0 0-18.831-27.594z'
        data-name='video'
      />
    </G>
    <G data-name='Layer 2'>
      <Path
        d='M407.197 341.286a62.5 62.5 0 1 0 62.5 62.5 62.5 62.5 0 0 0-62.5-62.5zm26.875 47.563-28.562 37.5a6.25 6.25 0 0 1-4.938 2.437 6.25 6.25 0 0 1-4.937-2.375l-15.25-19.437a6.257 6.257 0 0 1 9.875-7.688l10.187 13 23.625-31.25a6.288 6.288 0 1 1 10 7.625z'
        data-name='checkmark-circle-2'
      />
    </G>
  </Svg>
);

export const QuestionIcon = (props) => <Icon {...props} name='question-mark' />;

export const QuestionCheckedIcon = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 500 500'
    width={24}
    height={24}
    {...props}
  >
    <G data-name='Layer 2'>
      <G data-name='menu-arrow' transform='matrix(20.83333 0 0 20.83333 0 0)'>
        <Path d='M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z' />
        <Circle cx={12} cy={19} r={1} />
      </G>
    </G>
    <G data-name='Layer 2'>
      <Path
        d='M371.437 320.781a56.25 56.25 0 1 0 56.25 56.25 56.25 56.25 0 0 0-56.25-56.25zm24.188 42.807-25.706 33.75a5.625 5.625 0 0 1-4.444 2.193 5.625 5.625 0 0 1-4.444-2.137L347.306 379.9a5.632 5.632 0 0 1 8.888-6.919l9.168 11.7 21.263-28.125a5.659 5.659 0 1 1 9 6.863z'
        data-name='checkmark-circle-2'
      />
    </G>
  </Svg>
);

export const CodeIcon = (props) => <Icon {...props} name='code' />;

export const CodeCheckedIcon = (props) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 500 500'
    width={24}
    height={24}
    {...props}
  >
    <G data-name='Layer 2'>
      <G data-name='code'>
        <Path d='M165.767 125.952a18.323 18.323 0 0 0-25.836 2.382l-91.616 109.94a18.323 18.323 0 0 0 0 23.27l88.501 109.939a18.323 18.323 0 0 0 14.293 6.78 18.323 18.323 0 0 0 14.292-29.867L86.06 250l82.088-98.212a18.323 18.323 0 0 0-2.382-25.836zM406.534 238.456 318.95 128.517a18.323 18.323 0 0 0-25.835-2.748 18.323 18.323 0 0 0-2.749 25.835L368.605 250l-82.088 98.396a18.323 18.323 0 0 0 2.382 25.835 18.323 18.323 0 0 0 11.727 4.032 18.323 18.323 0 0 0 14.109-6.597l91.616-109.94a18.323 18.323 0 0 0 .183-23.27z' />
      </G>
    </G>
    <G data-name='Layer 2'>
      <Path
        d='M417.546 313.363a62.5 62.5 0 1 0 62.5 62.5 62.5 62.5 0 0 0-62.5-62.5zm26.875 47.562-28.563 37.5a6.25 6.25 0 0 1-4.937 2.438 6.25 6.25 0 0 1-4.938-2.375l-15.25-19.438a6.257 6.257 0 0 1 9.875-7.687l10.188 13 23.625-31.25a6.288 6.288 0 1 1 10 7.625z'
        data-name='checkmark-circle-2'
      />
    </G>
  </Svg>
);

export const CloseCircleOutlineIcon = (props) => (
  <Icon {...props} name='close-circle-outline' />
);

export const CheckmarkCircle2OutlineIcon = (props) => (
  <Icon {...props} name='checkmark-circle-2-outline' />
);

export const InfoOutlineIcon = (props) => <Icon {...props} name='info-outline' />;
