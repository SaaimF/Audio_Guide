package com.audioguides_paris.newarchitecture;

import android.app.Application;
import androidx.annotation.NonNull;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.audioguides_paris.BuildConfig;

import java.util.Arrays;
import java.util.List;

public class MainApplicationReactNativeHost extends ReactNativeHost {

    public MainApplicationReactNativeHost(Application application) {
        super(application);
    }

    @Override
    public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage()
            // Add other packages here
        );
    }

    @Override
    protected String getJSMainModuleName() {
        return "index";
    }

    // Removed `getReactPackageTurboModuleManagerDelegateBuilder` and `getJSIModulePackage` if they cause issues

}
