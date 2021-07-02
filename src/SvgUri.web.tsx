import React, { useEffect, useState } from 'react';
import SvgXml, { SvgProps } from './SvgXml.web';
import { err, fetchText, UriProps } from './xml';

const SvgUri = React.forwardRef<HTMLOrSVGElement, UriProps>(
  (props: UriProps, forwardRef) => {
    const { onError = err, uri } = props;
    const [xml, setXml] = useState<string | null>(null);
    useEffect(() => {
      uri
        ? fetchText(uri)
            .then(setXml)
            .catch(onError)
        : setXml(null);
    }, [onError, uri]);
    return <SvgXml ref={forwardRef} xml={xml} override={props as SvgProps} />;
  },
);

export default SvgUri;
