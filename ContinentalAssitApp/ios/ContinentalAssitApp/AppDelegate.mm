#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"  // here

@implementation AppDelegate

  - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
  {
    self.moduleName = @"ContinentalAssitApp";
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = @{};
    // [RNSplashScreen show];  // here
    // return [super application:application didFinishLaunchingWithOptions:launchOptions];
    bool didFinish=[super application:application didFinishLaunchingWithOptions:launchOptions];
    
    [RNSplashScreen show];  // here
    return didFinish;
  }

  - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
  {
    return [self getBundleURL];
  }
  
  - (NSURL *)getBundleURL
  {
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
  #else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
  }

@end
