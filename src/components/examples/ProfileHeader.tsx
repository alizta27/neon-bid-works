import ProfileHeader from '../ProfileHeader';

export default function ProfileHeaderExample() {
  return (
    <div className="max-w-md mx-auto p-4">
      <ProfileHeader
        username="JohnDoe"
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        bio="Desainer grafis profesional dengan 5+ tahun pengalaman. Siap membantu proyek kreatif Anda! 🎨✨"
        tokens={12500}
        postCount={24}
        onEditProfile={() => console.log('Edit profile clicked')}
        handleLogout={() => console.log('Logout clicked')}
      />
    </div>
  );
}
