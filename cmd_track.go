package main

import (
	"fmt"
	"github.com/codegangsta/cli"
	"github.com/keybase/go-libkb"
)

type CmdTrack struct {
	user      string
	assertion string
	track     bool
}

func (v *CmdTrack) ParseArgv(ctx *cli.Context) error {
	nargs := len(ctx.Args())
	var err error
	v.track = ctx.Bool("track-statement")
	if nargs == 1 {
		v.user = ctx.Args()[0]
	} else {
		err = fmt.Errorf("track takes one arg -- the user to track")
	}
	return err
}

func (v *CmdTrack) Run() error {

	eng := &libkb.TrackEngine {
		TheirName : v.user,
		NoSelf : true,
		Interactive : true,
		Me : nil,
		StrictProofs : false,
		MeRequired : true,
	}
	return eng.Run()
}

func NewCmdTrack(cl *CommandLine) cli.Command {
	return cli.Command{
		Name:        "track",
		Usage:       "keybase track <username>",
		Description: "verify a user's authenticity and optionally track them",
		Flags: []cli.Flag{
			cli.StringFlag{
				Name:  "assert, a",
				Usage: "a boolean expression on this identity",
			},
		},
		Action: func(c *cli.Context) {
			cl.ChooseCommand(&CmdTrack{}, "track", c)
		},
	}
}

func (v *CmdTrack) UseConfig() bool   { return true }
func (v *CmdTrack) UseKeyring() bool  { return true }
func (v *CmdTrack) UseAPI() bool      { return true }
func (v *CmdTrack) UseTerminal() bool { return true }
