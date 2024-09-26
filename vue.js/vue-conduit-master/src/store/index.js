import article from '@/features/article/store/module';
import login from '@/features/auth/login/store/module';
import register from '@/features/auth/register/store/module';
import comment from '@/features/comment/store/module';
import editor from '@/features/editor/store/module';
import home from '@/features/home/store/module';
import profile from '@/features/profile/store/module';
import settings from '@/features/settings/store/module';
import auth from '@/features/shared/auth/store/module';
import favoriteButton from '@/features/shared/ui/buttons/favorite-button/store/module';
import followButton from '@/features/shared/ui/buttons/follow-button/store/module';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    login,
    register,
    profile,
    settings,
    home,
    editor,
    favoriteButton,
    followButton,
    article,
    comment
  }
});
