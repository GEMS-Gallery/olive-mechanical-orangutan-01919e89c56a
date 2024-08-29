export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getCurrentTime' : IDL.Func([], [IDL.Int], ['query']),
    'getGreeting' : IDL.Func([], [IDL.Text], ['query']),
    'getUpdateCount' : IDL.Func([], [IDL.Nat], ['query']),
    'setGreeting' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
