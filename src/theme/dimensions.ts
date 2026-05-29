import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('screen');

type DesignSize = {width: number; height: number};

const CURRENT_RESOLUTION = Math.sqrt(height * height + width * width);

// Creates a scaling function based on the design resolution
const create = (designSize: DesignSize): ((size: number) => number) => {
  if (
    !designSize ||
    typeof designSize?.width !== 'number' ||
    typeof designSize?.height !== 'number' ||
    !designSize?.width ||
    !designSize?.height
  ) {
    throw new Error(
      'create function | Invalid design size object! must have width and height fields of type Number.',
    );
  }
  const DESIGN_RESOLUTION = Math.sqrt(
    designSize.height * designSize.height + designSize.width * designSize.width,
  );
  const RESOLUTIONS_PROPORTION = CURRENT_RESOLUTION / DESIGN_RESOLUTION;
  return (size: number) => Number((RESOLUTIONS_PROPORTION * size).toFixed());
};

// The screen size your design is based on (e.g. iPhone 14 Pro Max)
const designResolution: DesignSize = {
  width: 430,
  height: 932,
};

export const perfectSize = create(designResolution);
