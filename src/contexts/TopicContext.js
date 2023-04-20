import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const INITIAL_TOPIC = 'All';
const TopicContext = createContext();

export function TopicProvider(props) {
  const [activeTopic, setActiveTopic] = useState(INITIAL_TOPIC);

  const handleChangeTopic = useCallback((topic) => setActiveTopic(topic), []);

  const value = useMemo(
    () => ({
      activeTopic,
      handleChangeTopic,
    }),
    [activeTopic]
  );

  return <TopicContext.Provider value={value} {...props} />;
}

export function useTopic() {
  const context = useContext(TopicContext);

  if (!context) {
    throw new Error('useTopic must be wrapped in a <TopicProvider />');
  }

  return context;
}
