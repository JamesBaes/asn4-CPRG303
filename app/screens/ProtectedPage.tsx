import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/auth-context';

export default function ProtectedPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Invalid access.</Text>
        <Pressable onPress={() => router.navigate('/')}>Click to Return Home.</Pressable>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}!</Text>
    </View>
  );
}