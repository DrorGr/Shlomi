
import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User as UserIcon, Mail, Phone, MapPin, LogOut } from 'lucide-react';
import { useTranslation } from '@/components/LanguageProvider';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      setFormData({
        full_name: currentUser.full_name || '',
        phone: currentUser.phone || '',
        address: currentUser.address || ''
      });
    } catch (error) {
      console.log('User not authenticated');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await User.updateMyUserData(formData);
      setUser(prevUser => prevUser ? { ...prevUser, ...formData } : null);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await User.logout();
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md premium-shadow border-0 bg-slate-800/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <UserIcon className="w-16 h-16 mx-auto mb-4 text-slate-500" />
            <h2 className="text-2xl font-bold text-white mb-4">{t('signInRequired')}</h2>
            <p className="text-slate-400 mb-6">{t('signInToViewProfile')}</p>
            <Button 
              onClick={() => User.login()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold"
            >
              {t('signIn')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{t('myProfile')}</h1>
          <p className="text-xl text-slate-300">{t('manageAccount')}</p>
        </div>

        <Card className="bg-slate-800/90 backdrop-blur-sm border-0 premium-shadow">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">{user.full_name || 'User'}</CardTitle>
                  <p className="text-slate-400">{user.email}</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-800 text-red-400 hover:bg-red-900/50 rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('logout')}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-300 font-medium">
                  <UserIcon className="w-4 h-4" />
                  {t('fullName')}
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    className="h-12 border-slate-600 focus:border-indigo-500 rounded-xl bg-slate-800 text-slate-200"
                  />
                ) : (
                  <div className="h-12 flex items-center px-4 bg-slate-700 rounded-xl text-slate-300 font-medium">
                    {user.full_name || t('notProvided')}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-300 font-medium">
                  <Mail className="w-4 h-4" />
                  {t('emailAddress')}
                </Label>
                <div className="h-12 flex items-center px-4 bg-slate-700 rounded-xl text-slate-300 font-medium">
                  {user.email}
                </div>
                <p className="text-xs text-slate-500">{t('emailCannotBeChanged')}</p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-300 font-medium">
                  <Phone className="w-4 h-4" />
                  {t('phoneNumber')}
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-12 border-slate-600 focus:border-indigo-500 rounded-xl bg-slate-800 text-slate-200"
                  />
                ) : (
                  <div className="h-12 flex items-center px-4 bg-slate-700 rounded-xl text-slate-300 font-medium">
                    {user.phone || t('notProvided')}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-300 font-medium">
                  <MapPin className="w-4 h-4" />
                  {t('address')}
                </Label>
                {isEditing ? (
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="h-12 border-slate-600 focus:border-indigo-500 rounded-xl bg-slate-800 text-slate-200"
                  />
                ) : (
                  <div className="h-12 flex items-center px-4 bg-slate-700 rounded-xl text-slate-300 font-medium">
                    {user.address || t('notProvided')}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold h-12"
                  >
                    {isSaving ? t('saving') : t('saveChanges')}
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl h-12"
                  >
                    {t('cancel')}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold h-12"
                >
                  {t('editProfile')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
