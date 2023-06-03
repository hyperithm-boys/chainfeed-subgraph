import json
import yaml

with open("multiToken/tokens.json") as f:
    tokens = json.load(f)


def token2datasource(symbol, address, startBlock):
    return {
        "kind": "ethereum",
        "name": symbol,
        "network": "mainnet",
        "source": {
            "address": address,
            "abi": symbol,
            "startBlock": startBlock,
        },
        "mapping": {
            "kind": "ethereum/events",
            "apiVersion": "0.0.7",
            "language": "wasm/assemblyscript",
            "entities": ["Transfer"],
            "abis": [
                {
                    "name": symbol,
                    "file": "./abis/erc20.json",
                }
            ],
            "eventHandlers": [
                {
                    "event": "Transfer(indexed address,indexed address,uint256)",
                    "handler": "handleTransfer",
                    "receipt": True,
                }
            ],
            "file": "./src/erc20.ts",
        },
    }


env = {
    "specVersion": "0.0.5",
    "schema": {"file": "./schema.graphql"},
    "dataSources": [
        token2datasource(t["symbol"], t["address"], 17400000) for t in tokens
    ],
}

with open("subgraph.yaml", "w") as f:
    yaml.dump(env, f)
