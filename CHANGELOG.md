# Changelog
Notable changes to the Casa Node 2 project will be documented in this file

## 2020-02-12, Manager 2.4.0
### Fixed
- Fixed import seed phrase bug after device reset
- Fix Tor Browser 9.0.5 incompatibility

### Changed
- Changed previous release dates from February to January
- Changed update modal to only display which containers are not currently downloading

## 2020-01-31, UI 2.3.0, Manager 2.3.0, LND 2.1.0, Bitcoind 2.1.0
### Added
- Added ability for LND to recieve Spontanious Payments
- Added transaction refresh after send/recieve on-chain and off-chain payments
- Added a transaction details page for off-chain payments
- Added SSH toggle
- Added auto unlock lnd after update

### Changed
- Changed LND to run 0.9.1
- Changed Bitcoind to run 0.19.0.1
- Changed Shutdown flow to include a progress bar

### Fixed
- Fixed Update flow to better utilize a progress bar
- Fixed Tor bug with saving autopilot settings
- Fixed Bitcoind/Lnd Tor toggles
- Fixed misidentified autopilot channels
- Fixed auto unlock after save settings

## 2020-01-27, UI 2.2.0, Manager 2.2.0
### Added 
- Added SSH toggle
- Added loading indicator for login button
- Added On-Chain transaction refresh after sending Bitcoin

### Changed
- Changed On-Chain transaction flow by removing BTC/Sats toggle

### Fixed
- Fixed Tor Browser connection issues with user interface
- Fixed Tor toggle for Bitcoind and LND 
- Fixed relative time in transaction lists

## 2020-01-16, UI 2.1.4, Manager 2.1.2
### Added
- Added pop up confirmations when copying
- Added missing commas in transactions

### Fixed
- Fixed double sends of api calls
- Fixed broken loading states
- Tor issues with lnd and bitcoind

## 2020-01-10, UI 2.1.3
### Changed
- Removed BTC/SATS toggles where confusing

### Fixed
- Fixed Locked/Unlocked state after unlock modal

### Added
- Added misc error/success toasts
- Added first time welcome modal

## 2020-01-10, UI 2.1.2
### Fixed
- Fixed manage channel modal
- Fixed redirects after save settings
- Fixed balance miscalculations
- Fixed missing tor data on systemn settings page

### Added
- Added missing links on system settings
- Added loading indicator during update 

## 2020-01-09, UI 2.1.1
### Fixed
- Fixed missing tor addresses on system settings page

## 2020-01-09, UI 2.1.0
### Added
- Added unlock modal
- Added data auto refresh

## 2019-12-16, All products 2.0.0
### Added
- First Stable release of Casa Node 2
