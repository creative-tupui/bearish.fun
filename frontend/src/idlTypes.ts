/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/bearish_dot_fun.json`.
 */
export type BearishDotFun = {
    "address": "FVkDSzbkhPjoB6Jxe5aFx6ExAZq8RzBRVVSebmqRg9Py",
    "metadata": {
        "name": "bearishDotFun",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "claimAffiliateWinnings",
            "discriminator": [
                173,
                85,
                113,
                27,
                172,
                92,
                30,
                21
            ],
            "accounts": [
                {
                    "name": "user"
                },
                {
                    "name": "affiliate",
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "platformVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "stablecoin"
                },
                {
                    "name": "round"
                },
                {
                    "name": "userBet",
                    "writable": true
                },
                {
                    "name": "affiliateTokenAccount",
                    "writable": true
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram"
                }
            ],
            "args": [
                {
                    "name": "roundIndex",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "claimUserWinnings",
            "discriminator": [
                158,
                208,
                185,
                185,
                180,
                124,
                160,
                16
            ],
            "accounts": [
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "userInfo",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    117,
                                    115,
                                    101,
                                    114
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user"
                            }
                        ]
                    }
                },
                {
                    "name": "round"
                },
                {
                    "name": "userBet",
                    "writable": true
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "roundIndex",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "deposit",
            "discriminator": [
                242,
                35,
                198,
                137,
                82,
                225,
                242,
                182
            ],
            "accounts": [
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "stablecoin"
                },
                {
                    "name": "platformVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "userTokenAccount",
                    "writable": true
                },
                {
                    "name": "userInfo",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    117,
                                    115,
                                    101,
                                    114
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user"
                            }
                        ]
                    }
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "endRound",
            "discriminator": [
                54,
                47,
                1,
                200,
                250,
                6,
                144,
                63
            ],
            "accounts": [
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "round",
                    "writable": true
                },
                {
                    "name": "priceAccount"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "initialize",
            "discriminator": [
                175,
                175,
                109,
                31,
                13,
                152,
                155,
                237
            ],
            "accounts": [
                {
                    "name": "owner",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "stablecoin"
                },
                {
                    "name": "platformVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram"
                }
            ],
            "args": [
                {
                    "name": "globalRoundInfo",
                    "type": {
                        "defined": {
                            "name": "globalRoundInfo"
                        }
                    }
                }
            ]
        },
        {
            "name": "placeBet",
            "discriminator": [
                222,
                62,
                67,
                220,
                63,
                166,
                126,
                33
            ],
            "accounts": [
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "userInfo",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    117,
                                    115,
                                    101,
                                    114
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user"
                            }
                        ]
                    }
                },
                {
                    "name": "round",
                    "writable": true
                },
                {
                    "name": "userBet",
                    "writable": true
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                },
                {
                    "name": "isLong",
                    "type": "bool"
                }
            ]
        },
        {
            "name": "setAffiliate",
            "discriminator": [
                239,
                206,
                13,
                0,
                98,
                227,
                86,
                233
            ],
            "accounts": [
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "userInfo",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    117,
                                    115,
                                    101,
                                    114
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user"
                            }
                        ]
                    }
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "affiliate",
                    "type": "pubkey"
                }
            ]
        },
        {
            "name": "setAllocation",
            "discriminator": [
                119,
                81,
                22,
                4,
                114,
                187,
                23,
                145
            ],
            "accounts": [
                {
                    "name": "owner",
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                }
            ],
            "args": [
                {
                    "name": "allocation",
                    "type": {
                        "defined": {
                            "name": "allocation"
                        }
                    }
                }
            ]
        },
        {
            "name": "setDuration",
            "discriminator": [
                28,
                157,
                247,
                166,
                68,
                185,
                230,
                238
            ],
            "accounts": [
                {
                    "name": "owner",
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                }
            ],
            "args": [
                {
                    "name": "duration",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "setJackpotAllocation",
            "discriminator": [
                238,
                183,
                103,
                170,
                90,
                144,
                2,
                13
            ],
            "accounts": [
                {
                    "name": "owner",
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                }
            ],
            "args": [
                {
                    "name": "jackpotAllocation",
                    "type": {
                        "defined": {
                            "name": "jackPotAllocation"
                        }
                    }
                }
            ]
        },
        {
            "name": "setMinBetAmount",
            "discriminator": [
                210,
                47,
                134,
                160,
                149,
                208,
                190,
                239
            ],
            "accounts": [
                {
                    "name": "owner",
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                }
            ],
            "args": [
                {
                    "name": "minBetAmount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "setPriceAccount",
            "discriminator": [
                6,
                127,
                170,
                42,
                66,
                99,
                161,
                151
            ],
            "accounts": [
                {
                    "name": "owner",
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                }
            ],
            "args": [
                {
                    "name": "priceAccount",
                    "type": "pubkey"
                }
            ]
        },
        {
            "name": "setStalenessThreshold",
            "discriminator": [
                200,
                61,
                16,
                5,
                100,
                125,
                172,
                210
            ],
            "accounts": [
                {
                    "name": "owner",
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                }
            ],
            "args": [
                {
                    "name": "stalenessThreshold",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "startRound",
            "discriminator": [
                144,
                144,
                43,
                7,
                193,
                42,
                217,
                215
            ],
            "accounts": [
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "round",
                    "writable": true
                },
                {
                    "name": "priceAccount"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "transferOwnership",
            "discriminator": [
                65,
                177,
                215,
                73,
                53,
                45,
                99,
                47
            ],
            "accounts": [
                {
                    "name": "owner",
                    "signer": true
                },
                {
                    "name": "newOwner",
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                }
            ],
            "args": []
        },
        {
            "name": "withdraw",
            "discriminator": [
                183,
                18,
                70,
                156,
                148,
                109,
                161,
                34
            ],
            "accounts": [
                {
                    "name": "user",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "stablecoin"
                },
                {
                    "name": "platformVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "userTokenAccount",
                    "writable": true
                },
                {
                    "name": "userInfo",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    117,
                                    115,
                                    101,
                                    114
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "user"
                            }
                        ]
                    }
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram"
                }
            ],
            "args": [
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "withdrawPlatformFees",
            "discriminator": [
                87,
                24,
                138,
                122,
                62,
                146,
                186,
                199
            ],
            "accounts": [
                {
                    "name": "owner",
                    "signer": true
                },
                {
                    "name": "platformConfig",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "stablecoin"
                },
                {
                    "name": "platformVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    112,
                                    108,
                                    97,
                                    116,
                                    102,
                                    111,
                                    114,
                                    109,
                                    95,
                                    118,
                                    97,
                                    117,
                                    108,
                                    116
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "ownerTokenAccount",
                    "writable": true
                },
                {
                    "name": "tokenProgram"
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "bet",
            "discriminator": [
                147,
                23,
                35,
                59,
                15,
                75,
                155,
                32
            ]
        },
        {
            "name": "platformConfig",
            "discriminator": [
                160,
                78,
                128,
                0,
                248,
                83,
                230,
                160
            ]
        },
        {
            "name": "round",
            "discriminator": [
                87,
                127,
                165,
                51,
                73,
                78,
                116,
                174
            ]
        },
        {
            "name": "userInfo",
            "discriminator": [
                83,
                134,
                200,
                56,
                144,
                56,
                10,
                62
            ]
        }
    ],
    "events": [
        {
            "name": "affiliateSet",
            "discriminator": [
                242,
                39,
                33,
                12,
                23,
                49,
                183,
                155
            ]
        },
        {
            "name": "affiliateWinningsClaimed",
            "discriminator": [
                184,
                37,
                205,
                37,
                124,
                199,
                126,
                83
            ]
        },
        {
            "name": "allocationSet",
            "discriminator": [
                32,
                45,
                253,
                55,
                65,
                85,
                102,
                218
            ]
        },
        {
            "name": "betPlaced",
            "discriminator": [
                88,
                88,
                145,
                226,
                126,
                206,
                32,
                0
            ]
        },
        {
            "name": "collectedPlatformFees",
            "discriminator": [
                150,
                242,
                234,
                9,
                201,
                66,
                235,
                198
            ]
        },
        {
            "name": "deposited",
            "discriminator": [
                111,
                141,
                26,
                45,
                161,
                35,
                100,
                57
            ]
        },
        {
            "name": "durationSet",
            "discriminator": [
                71,
                11,
                7,
                226,
                11,
                70,
                113,
                89
            ]
        },
        {
            "name": "initialized",
            "discriminator": [
                208,
                213,
                115,
                98,
                115,
                82,
                201,
                209
            ]
        },
        {
            "name": "jackPotAllocationSet",
            "discriminator": [
                224,
                221,
                118,
                233,
                113,
                150,
                29,
                4
            ]
        },
        {
            "name": "minBetAmountSet",
            "discriminator": [
                162,
                199,
                146,
                106,
                239,
                196,
                170,
                95
            ]
        },
        {
            "name": "ownershipTransferred",
            "discriminator": [
                172,
                61,
                205,
                183,
                250,
                50,
                38,
                98
            ]
        },
        {
            "name": "priceAccountSet",
            "discriminator": [
                184,
                147,
                189,
                171,
                55,
                139,
                251,
                117
            ]
        },
        {
            "name": "roundEnded",
            "discriminator": [
                70,
                113,
                6,
                162,
                176,
                78,
                201,
                19
            ]
        },
        {
            "name": "roundStarted",
            "discriminator": [
                180,
                209,
                2,
                244,
                238,
                48,
                170,
                120
            ]
        },
        {
            "name": "stalenessThresholdSet",
            "discriminator": [
                75,
                100,
                196,
                207,
                227,
                252,
                58,
                210
            ]
        },
        {
            "name": "winningsClaimed",
            "discriminator": [
                187,
                184,
                29,
                196,
                54,
                117,
                70,
                150
            ]
        },
        {
            "name": "withdrawn",
            "discriminator": [
                20,
                89,
                223,
                198,
                194,
                124,
                219,
                13
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "durationZero",
            "msg": "Round duration cannot be 0."
        },
        {
            "code": 6001,
            "name": "invalidAllocation",
            "msg": "Invalid allocation. Does not add up to 100%."
        },
        {
            "code": 6002,
            "name": "exceedsMaxFee",
            "msg": "Exceeds max fee in bips."
        },
        {
            "code": 6003,
            "name": "invalidJackPotAllocation",
            "msg": "Invalid jackpot allocation."
        },
        {
            "code": 6004,
            "name": "priceAccountDefaultPubkey",
            "msg": "Price account cannot be default pubkey."
        },
        {
            "code": 6005,
            "name": "depositAmountZero",
            "msg": "Deposit amount cannot be 0."
        },
        {
            "code": 6006,
            "name": "withdrawAmountZero",
            "msg": "Withdraw amount cannot be 0."
        },
        {
            "code": 6007,
            "name": "invalidAffiliate",
            "msg": "Invalid affiliate address."
        },
        {
            "code": 6008,
            "name": "priceCannotBeZero",
            "msg": "Price cannot be 0."
        },
        {
            "code": 6009,
            "name": "roundHasNotEndedYet",
            "msg": "Round has not ended yet."
        },
        {
            "code": 6010,
            "name": "roundAlreadyStarted",
            "msg": "Round already started."
        },
        {
            "code": 6011,
            "name": "roundAlreadyEnded",
            "msg": "Round already ended."
        },
        {
            "code": 6012,
            "name": "betAmountBelowMinBetAmount",
            "msg": "Bet amount cannot be less than the minimum bet amount."
        },
        {
            "code": 6013,
            "name": "alreadyClaimedWinnings",
            "msg": "Already claimed winnings."
        },
        {
            "code": 6014,
            "name": "ineligibleForClaim",
            "msg": "Ineligible for claim."
        },
        {
            "code": 6015,
            "name": "alreadyCollectedPlatformFees",
            "msg": "Already collected platform fees."
        },
        {
            "code": 6016,
            "name": "claimAmountZero",
            "msg": "Claim amount cannot be 0."
        },
        {
            "code": 6017,
            "name": "platformFeeAmountZero",
            "msg": "Platform fee amount to collect is 0."
        }
    ],
    "types": [
        {
            "name": "affiliateSet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "user",
                        "type": "pubkey"
                    },
                    {
                        "name": "affiliate",
                        "type": "pubkey"
                    }
                ]
            }
        },
        {
            "name": "affiliateWinningsClaimed",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "affiliate",
                        "type": "pubkey"
                    },
                    {
                        "name": "roundIndex",
                        "type": "u64"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "allocation",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "winnersShare",
                        "type": "u16"
                    },
                    {
                        "name": "affiliateShare",
                        "type": "u16"
                    },
                    {
                        "name": "jackpotShare",
                        "type": "u16"
                    },
                    {
                        "name": "platformShare",
                        "type": "u16"
                    }
                ]
            }
        },
        {
            "name": "allocationSet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "allocation",
                        "type": {
                            "defined": {
                                "name": "allocation"
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "bet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "isLong",
                        "type": "bool"
                    },
                    {
                        "name": "affiliate",
                        "type": "pubkey"
                    },
                    {
                        "name": "hasClaimedWinnings",
                        "type": "bool"
                    },
                    {
                        "name": "hasAffiliateClaimedWinnings",
                        "type": "bool"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "betPlaced",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "user",
                        "type": "pubkey"
                    },
                    {
                        "name": "round",
                        "type": "u64"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "isLong",
                        "type": "bool"
                    },
                    {
                        "name": "affiliate",
                        "type": "pubkey"
                    }
                ]
            }
        },
        {
            "name": "collectedPlatformFees",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "pubkey"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "deposited",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "user",
                        "type": "pubkey"
                    },
                    {
                        "name": "stablecoin",
                        "type": "pubkey"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "durationSet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "duration",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "globalRoundInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "round",
                        "type": "u64"
                    },
                    {
                        "name": "duration",
                        "type": "u64"
                    },
                    {
                        "name": "allocation",
                        "type": {
                            "defined": {
                                "name": "allocation"
                            }
                        }
                    },
                    {
                        "name": "jackpotAllocation",
                        "type": {
                            "defined": {
                                "name": "jackPotAllocation"
                            }
                        }
                    },
                    {
                        "name": "minBetAmount",
                        "type": "u64"
                    },
                    {
                        "name": "priceAccount",
                        "type": "pubkey"
                    },
                    {
                        "name": "stalenessThreshold",
                        "type": "u64"
                    },
                    {
                        "name": "jackpotPoolAmount",
                        "type": "u64"
                    },
                    {
                        "name": "accumulatedPlatformFees",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "initialized",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "pubkey"
                    },
                    {
                        "name": "stablecoin",
                        "type": "pubkey"
                    },
                    {
                        "name": "platformVault",
                        "type": "pubkey"
                    },
                    {
                        "name": "globalRoundInfo",
                        "type": {
                            "defined": {
                                "name": "globalRoundInfo"
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "jackPotAllocation",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "streak5",
                        "type": "u16"
                    },
                    {
                        "name": "streak6",
                        "type": "u16"
                    },
                    {
                        "name": "streak7",
                        "type": "u16"
                    },
                    {
                        "name": "streak8",
                        "type": "u16"
                    },
                    {
                        "name": "streak9",
                        "type": "u16"
                    },
                    {
                        "name": "streak10",
                        "type": "u16"
                    }
                ]
            }
        },
        {
            "name": "jackPotAllocationSet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "jackpotAllocation",
                        "type": {
                            "defined": {
                                "name": "jackPotAllocation"
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "minBetAmountSet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "minBetAmount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "ownershipTransferred",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "pubkey"
                    },
                    {
                        "name": "newOwner",
                        "type": "pubkey"
                    }
                ]
            }
        },
        {
            "name": "platformConfig",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "pubkey"
                    },
                    {
                        "name": "stablecoin",
                        "type": "pubkey"
                    },
                    {
                        "name": "globalRoundInfo",
                        "type": {
                            "defined": {
                                "name": "globalRoundInfo"
                            }
                        }
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "platformVaultBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "priceAccountSet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "priceAccount",
                        "type": "pubkey"
                    }
                ]
            }
        },
        {
            "name": "round",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "startTime",
                        "type": "u64"
                    },
                    {
                        "name": "startingPrice",
                        "type": "u64"
                    },
                    {
                        "name": "endingPrice",
                        "type": "u64"
                    },
                    {
                        "name": "longPositions",
                        "type": "u64"
                    },
                    {
                        "name": "shortPositions",
                        "type": "u64"
                    },
                    {
                        "name": "affiliatesForLongPositions",
                        "type": "u64"
                    },
                    {
                        "name": "affiliatesForShortPositions",
                        "type": "u64"
                    },
                    {
                        "name": "totalBetAmountLong",
                        "type": "u64"
                    },
                    {
                        "name": "totalBetAmountShort",
                        "type": "u64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "roundEnded",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "round",
                        "type": "u64"
                    },
                    {
                        "name": "endingPrice",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "roundStarted",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "round",
                        "type": "u64"
                    },
                    {
                        "name": "startingPrice",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "stalenessThresholdSet",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "stalenessThreshold",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "userInfo",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "affiliate",
                        "type": "pubkey"
                    },
                    {
                        "name": "lastWonRound",
                        "type": "u64"
                    },
                    {
                        "name": "timesWon",
                        "type": "u64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "winningsClaimed",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "user",
                        "type": "pubkey"
                    },
                    {
                        "name": "roundIndex",
                        "type": "u64"
                    },
                    {
                        "name": "isLong",
                        "type": "bool"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "withdrawn",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "user",
                        "type": "pubkey"
                    },
                    {
                        "name": "stablecoin",
                        "type": "pubkey"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        }
    ],
    "constants": [
        {
            "name": "bps",
            "type": "u16",
            "value": "10000"
        },
        {
            "name": "platformConfig",
            "type": "bytes",
            "value": "[112, 108, 97, 116, 102, 111, 114, 109, 95, 99, 111, 110, 102, 105, 103]"
        },
        {
            "name": "platformVault",
            "type": "bytes",
            "value": "[112, 108, 97, 116, 102, 111, 114, 109, 95, 118, 97, 117, 108, 116]"
        },
        {
            "name": "round",
            "type": "bytes",
            "value": "[114, 111, 117, 110, 100]"
        },
        {
            "name": "user",
            "type": "bytes",
            "value": "[117, 115, 101, 114]"
        },
        {
            "name": "userBet",
            "type": "bytes",
            "value": "[117, 115, 101, 114, 95, 98, 101, 116]"
        }
    ]
};
