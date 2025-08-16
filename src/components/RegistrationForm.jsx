import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User } from "@/api/entities";
import { UserPlus, Mail, User as UserIcon, Phone } from 'lucide-react';
import { useTranslation } from '@/components/LanguageProvider';

export default function RegistrationForm({ onSuccess }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await User.updateMyUserData(formData);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto premium-shadow border-0 bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">{t('joinLottery')}</CardTitle>
        <p className="text-slate-400">{t('completeProfile')}</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="flex items-center gap-2 text-slate-300 font-medium">
              <UserIcon className="w-4 h-4" />
              {t('fullName')}
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="h-12 border-slate-600 focus:border-indigo-500 rounded-xl bg-slate-800 text-slate-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-slate-300 font-medium">
              <Mail className="w-4 h-4" />
              {t('emailAddress')}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="h-12 border-slate-600 focus:border-indigo-500 rounded-xl bg-slate-800 text-slate-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-slate-300 font-medium">
              <Phone className="w-4 h-4" />
              {t('phoneNumber')}
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="h-12 border-slate-600 focus:border-indigo-500 rounded-xl bg-slate-800 text-slate-200"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-slate-300 font-medium">
              {t('address')}
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="h-12 border-slate-600 focus:border-indigo-500 rounded-xl bg-slate-800 text-slate-200"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold text-base transition-all duration-300"
          >
            {isSubmitting ? t('creatingAccount') : t('completeRegistration')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}